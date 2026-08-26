import { execFileSync, spawn } from "node:child_process"
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { writerId } from "../../agent/writer.ts"
import { CHECKS } from "../../checks/checks.ts"
import { applying, runGate } from "../../checks/run/gate.ts"
import { GATED } from "./gated.ts"

export const HERE = realpathSync(resolve(import.meta.dir, "..", ".."))

export const INSTRUCTIONS = process.env.INSTRUCTIONS_ROOT ?? resolve(HERE, "..", "instructions")

export const SCRATCH = "/var/tmp"

const BUFFER_CEILING = 64 * 1024 * 1024

const DEFAULT_MODE = "100644"

export interface Landing {
  readonly relPath: string
  readonly from: string
}

export function fail(reason: string): never {
  process.stderr.write(`error: ${reason}\n`)
  process.exit(1)
}

function git(index: string | null, args: readonly string[]): Buffer {
  return execFileSync("git", ["-C", HERE, ...args], {
    maxBuffer: BUFFER_CEILING,
    env: index === null ? process.env : { ...process.env, GIT_INDEX_FILE: index },
  })
}

export function valueOf(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(name)
  if (at === -1) return null
  const value = argv[at + 1]
  if (value === undefined) fail(`${name} needs a value`)
  return value
}

export function without(argv: readonly string[], name: string): readonly string[] {
  const kept: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === name) {
      at += 1
      continue
    }
    kept.push(argv[at] as string)
  }
  return kept
}

export function payloadText(argv: readonly string[], wanted: boolean): string | null {
  const named = valueOf(argv, "--input-file")
  if (named !== null) {
    try {
      return readFileSync(resolve(process.cwd(), named), "utf8")
    } catch {
      return null
    }
  }
  if (!wanted) return null
  if (process.stdin.isTTY === true) return null
  try {
    const read = readFileSync(0, "utf8")
    return read === "" ? null : read
  } catch {
    return null
  }
}

export function inside(pathish: string): string | null {
  const absolute = resolve(process.cwd(), pathish)
  return absolute.startsWith(`${HERE}/`) ? absolute.slice(HERE.length + 1) : null
}

export function mustBeInside(pathish: string): string {
  const relPath = inside(pathish)
  if (relPath === null) fail(`${pathish} is not inside ${HERE}, so nothing says where it would land`)
  return relPath
}

export function bodyFile(content: string): string {
  const at = `${mkdtempSync(`${SCRATCH}/mp-body-`)}/body`
  writeFileSync(at, content)
  return at
}

function modeOf(index: string, relPath: string): string {
  const staged = git(index, ["ls-files", "--stage", "--", relPath]).toString("utf8").trim()
  const mode = staged.split(/\s+/)[0]
  return mode === undefined || mode === "" ? DEFAULT_MODE : mode
}

export function patchText(landings: readonly Landing[], removals: readonly string[] = []): string {
  const index = `${mkdtempSync(`${SCRATCH}/mp-write-`)}.index`
  try {
    git(index, ["read-tree", "HEAD"])
    for (const one of landings) {
      const sha = git(index, ["hash-object", "-w", "--path", one.relPath, one.from])
        .toString("utf8")
        .trim()
      const mode = modeOf(index, one.relPath)
      git(index, ["update-index", "--add", "--cacheinfo", `${mode},${sha},${one.relPath}`])
    }
    for (const relPath of removals) {
      git(index, ["update-index", "--force-remove", relPath])
    }
    return git(index, ["diff", "--cached", "--binary", "HEAD"]).toString("utf8")
  } finally {
    rmSync(index, { force: true })
  }
}

export function refusalsOver(patch: string, mechanical: boolean): readonly string[] {
  const held = mkdtempSync(`${SCRATCH}/mp-gate-`)
  const file = `${held}/change.patch`
  try {
    writeFileSync(file, patch)
    const said: string[] = []
    const asked = { root: HERE, file, writer: writerId(), mechanical }
    for (const ran of runGate(CHECKS, asked)) {
      if ("threw" in ran) {
        said.push(`${ran.slug} threw: ${ran.threw}`)
        continue
      }
      for (const failure of ran.failures) said.push(`${ran.slug}: ${failure.path} — ${failure.reason}`)
    }
    return said
  } finally {
    rmSync(held, { recursive: true, force: true })
  }
}

export function gateOrRefuse(patch: string, mechanical: boolean, changed: number): void {
  const refused = refusalsOver(patch, mechanical)
  if (refused.length > 0) {
    process.stderr.write(`${refused.join("\n")}\nnothing was written\n`)
    process.exit(1)
  }
  process.stderr.write(
    `gate: ${applying(CHECKS, mechanical).length} akasha check(s) over ${changed} changed file(s), none refused\n`
  )
}

export function runTool(tool: string, argv: readonly string[], catching: boolean): Promise<string> {
  const at = `${INSTRUCTIONS}/tools/${tool}`
  return new Promise<string>((resolve_, reject) => {
    const child = spawn(process.execPath, [at, ...argv], {
      stdio: catching ? ["ignore", "pipe", "pipe"] : "inherit",
      env: { ...process.env, INSTRUCTIONS_ROOT: INSTRUCTIONS, [GATED]: "1" },
    })
    let out = ""
    child.stdout?.on("data", (chunk: Buffer) => {
      out += chunk.toString()
    })
    child.on("error", () => reject(new Error(`${at} could not be run`)))
    child.on("close", (code) => {
      if (!catching && code !== 0) process.exitCode = code ?? 0
      resolve_(out.trim())
    })
  })
}
