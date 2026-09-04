#!/usr/bin/env bun

import { globSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { ran } from "@akasha/utils-run/running"

const HELP = `bun editor-extension/node-cleanliness/node-cleanliness.module.code.ts

Refuses a bun-only global in what the editor's extension host loads. What is judged, what is
carried, and where that stops is stated on the module page beside this file.

  --entry <path>  an entry point to judge, repeatable. Given none, they are derived.
  --no-run        read the bundles and do not import them under node.
  --help          This.
`

const REFUSED = /Bun\.\w+|import\.meta\.(?:path|dir|dirname)\b/g

const BUN_REACH = /^Bun\./

const GUARD = "typeof Bun"

const SECTION = /^\/\/ (\S+\.tsx?)$/

const QUOTES = new Set(["'", '"', "`"])

export function quotedAt(line: string, at: number): boolean {
  let open: string | null = null
  for (let i = 0; i < at; i += 1) {
    const one = line[i]
    if (one === "\\") {
      i += 1
      continue
    }
    if (one === undefined || !QUOTES.has(one)) continue
    if (open === null) open = one
    else if (open === one) open = null
  }
  return open !== null
}

const PACKAGE = "editor-extension/ops-extension"

const MANIFEST = "package.json"

const MODULES_UNDER = "editor-extension"

const SOURCES = "**/*.module.code.ts"

const MAIN = "main"

export function namedByManifest(text: string): string | null {
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object") return null
  const said = (held as Record<string, unknown>)[MAIN]
  if (typeof said !== "string" || said === "") return null
  return said.replace(/^\.\//, "")
}

export function sectionsIn(bundle: string): ReadonlySet<string> {
  const found = new Set<string>()
  for (const line of bundle.split("\n")) {
    const named = SECTION.exec(line)
    if (named?.[1] !== undefined) found.add(named[1])
  }
  return found
}

export function unreachedIn(
  root: string,
  pkg: string,
  reached: ReadonlySet<string>
): readonly string[] {
  return globSync(`${pkg}/${SOURCES}`, { cwd: root })
    .filter((one) => !reached.has(one))
    .sort()
}

const STUB = `const anything = () => new Proxy(function () {}, {
  get: (_t, k) => (k === "then" ? undefined : anything()),
  apply: () => anything(),
  construct: () => anything(),
})
module.exports = anything()
`

export interface Reach {
  readonly global: string
  readonly file: string
  readonly atImport: boolean
  readonly guarded: boolean
}

export function refusedIn(reach: Reach): boolean {
  if (reach.atImport) return true
  if (!BUN_REACH.test(reach.global)) return true
  return !reach.guarded
}

export function saidAs(reach: Reach): string {
  const where = reach.atImport ? ", at import" : ""
  return `${reach.global} in ${reach.file}${where}`
}

export function reachesIn(bundle: string): readonly Reach[] {
  const sections = new Map<string, string[]>()
  const lines = bundle.split("\n")
  let file = "the bundle"
  const order: { line: string; file: string }[] = []
  for (const line of lines) {
    const named = SECTION.exec(line)
    if (named?.[1] !== undefined) file = named[1]
    order.push({ line, file })
    const held = sections.get(file)
    if (held === undefined) sections.set(file, [line])
    else held.push(line)
  }
  const found: Reach[] = []
  const seen = new Set<string>()
  for (const { line, file: at } of order) {
    for (const hit of line.matchAll(REFUSED)) {
      if (quotedAt(line, hit.index)) continue
      const reach: Reach = {
        global: hit[0],
        file: at,
        atImport: !/^\s/.test(line),
        guarded: (sections.get(at) ?? []).some((one) => one.includes(GUARD)),
      }
      const key = saidAs(reach)
      if (seen.has(key)) continue
      seen.add(key)
      found.push(reach)
    }
  }
  return found
}

export interface Judged {
  readonly entry: string
  readonly refused: readonly string[]
  readonly carried: readonly string[]
  readonly threw: string | null
  readonly built: boolean
  readonly why: string | null
  readonly reached: ReadonlySet<string>
}

export function firstLines(said: string, count: number): string {
  return said
    .split("\n")
    .filter((one) => one.trim() !== "")
    .slice(0, count)
    .join(" / ")
}

async function threwUnderNode(bundleAt: string): Promise<string | null> {
  const out = mkdtempSync(join(tmpdir(), "ext-node-run-"))
  try {
    mkdirSync(join(out, "node_modules", "vscode"), { recursive: true })
    writeFileSync(join(out, "package.json"), `{ "type": "module" }\n`)
    writeFileSync(
      join(out, "node_modules", "vscode", "package.json"),
      `{ "name": "vscode", "version": "0.0.0", "main": "index.cjs" }\n`
    )
    writeFileSync(join(out, "node_modules", "vscode", "index.cjs"), STUB)
    writeFileSync(join(out, "bundle.js"), readFileSync(bundleAt, "utf8"))
    writeFileSync(join(out, "probe.mjs"), `await import("./bundle.js")\nprocess.exit(0)\n`)
    const done = ran(["node", join(out, "probe.mjs")], { cwd: out })
    if (done.code === 0) return null
    const said = `${done.err}${done.out}`.trim()
    return said === "" ? `node exited ${String(done.code)} and said nothing` : said
  } catch (err) {
    return `node could not be run: ${err instanceof Error ? err.message : String(err)}`
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}

export async function judge(root: string, entry: string, run: boolean): Promise<Judged> {
  const out = mkdtempSync(join(tmpdir(), "ext-node-clean-"))
  const nothing = { refused: [], carried: [], threw: null, reached: new Set<string>() }
  try {
    const built = await Bun.build({
      entrypoints: [join(root, entry)],
      target: "node",
      external: ["vscode"],
      outdir: out,
    })
    if (!built.success) {
      const why = built.logs.map((one) => String(one)).join("; ")
      return { entry, ...nothing, built: false, why: why === "" ? "the bundle failed" : why }
    }
    const files = globSync("**/*.js", { cwd: out })
    if (files.length === 0) {
      return {
        entry,
        ...nothing,
        built: false,
        why: "the bundle wrote no file, so nothing was judged",
      }
    }
    const refused = new Set<string>()
    const carried = new Set<string>()
    const reached = new Set<string>()
    for (const one of files) {
      const bundle = readFileSync(join(out, one), "utf8")
      for (const said of sectionsIn(bundle)) reached.add(said)
      for (const reach of reachesIn(bundle)) {
        if (refusedIn(reach)) refused.add(saidAs(reach))
        else carried.add(saidAs(reach))
      }
    }
    const threw = run ? await threwUnderNode(join(out, files[0] as string)) : null
    return {
      entry,
      refused: [...refused].sort(),
      carried: [...carried].sort(),
      threw,
      built: true,
      why: null,
      reached,
    }
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}

export async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  const asked: string[] = []
  let run = true
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === "--no-run") {
      run = false
      continue
    }
    if (argv[at] === "--entry") {
      const named = argv[at + 1]
      if (named === undefined) {
        process.stderr.write("error: --entry takes a path after it\n")
        return 1
      }
      asked.push(named)
      at += 1
      continue
    }
    process.stderr.write(`error: this command takes no flag ${String(argv[at])}\n`)
    return 1
  }
  const root = process.cwd()
  const deriving = asked.length === 0
  const entries: string[] = [...asked]
  if (deriving) {
    let text: string
    try {
      text = readFileSync(join(root, PACKAGE, MANIFEST), "utf8")
    } catch (err) {
      process.stderr.write(
        `error: ${PACKAGE}/${MANIFEST} could not be read, and it names the entry point: ` +
          `${err instanceof Error ? err.message : String(err)}\n`
      )
      return 3
    }
    const named = namedByManifest(text)
    if (named === null) {
      process.stderr.write(`error: ${PACKAGE}/${MANIFEST} names no \`${MAIN}\` to judge\n`)
      return 3
    }
    entries.push(`${PACKAGE}/${named}`)
  }
  const unreached = new Set<string>()
  const reached = new Set<string>()
  const unproved = new Set<string>()
  let refused = 0
  let unbuilt = 0
  let warned = 0
  for (let at = 0; at < entries.length; at += 1) {
    const entry = entries[at] as string
    const judged = await judge(root, entry, run)
    const wired = !unreached.has(entry)
    const word = wired ? "REFUSED " : "UNWIRED "
    if (!judged.built) {
      if (wired) unbuilt += 1
      process.stdout.write(`UNJUDGED ${entry} — ${String(judged.why)}\n`)
    } else {
      const bad = judged.refused.length > 0 || judged.threw !== null
      if (!bad) {
        process.stdout.write(`clean    ${entry}${wired ? "" : ", which nothing reaches"}\n`)
      } else {
        if (wired) refused += 1
        else warned += 1
        if (judged.refused.length > 0) {
          process.stdout.write(`${word} ${entry} reaches ${judged.refused.join(", ")}\n`)
        }
        if (judged.threw !== null) {
          process.stdout.write(
            `${word} ${entry} threw under node: ${firstLines(judged.threw, 3)}\n`
          )
        }
      }
      if (wired) {
        for (const one of judged.carried) {
          unproved.add(one)
          process.stdout.write(`  carried ${one}, guarded by \`${GUARD}\` in that file\n`)
        }
      }
    }
    for (const one of judged.reached) reached.add(one)
    if (!deriving) continue
    for (const one of unreachedIn(root, MODULES_UNDER, reached)) {
      if (entries.includes(one)) continue
      unreached.add(one)
      entries.push(one)
    }
  }
  const total = entries.length - unreached.size
  process.stdout.write(
    `${String(total - refused - unbuilt)} of ${String(total)} entry points carry no unguarded bun-only global\n`
  )
  if (unreached.size > 0) {
    process.stdout.write(
      `${String(unreached.size)} ${unreached.size === 1 ? "file" : "files"} no entry point reaches ` +
        `${unreached.size === 1 ? "was" : "were"} judged too, and ${String(warned)} would be ` +
        `refused on being wired in. The host loads none of them, so none is counted above\n`
    )
  }
  if (unproved.size > 0) {
    process.stdout.write(
      `${String(unproved.size)} guarded ${unproved.size === 1 ? "reach is" : "reaches are"} unproved: ` +
        `this runs no branch, so a guard whose node side throws is counted clean here\n`
    )
  }
  if (unbuilt > 0) return 4
  return refused > 0 ? 2 : 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
