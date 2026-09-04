import {
  cpSync,
  globSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { ran } from "@akasha/utils-run/running"

export const ENTRY =
  "akasha/editor-extension/ops-extension/extension-entry/extension-entry.module.code.ts"

export const STUB =
  "akasha/editor-extension/vscode-stub/vscode-stub.javascript-module.javascript.mjs"

const REACHED = /(?<!['"`])\bvscode\d*\.([A-Za-z_][A-Za-z0-9_]*)/g

const EXPORTED = /^export (?:const|class|function) ([A-Za-z_][A-Za-z0-9_]*)|^export \{([^}]*)\}/gm

const RUN_TIMEOUT_MS = 180_000

export function membersReached(bundle: string): readonly string[] {
  return [...new Set([...bundle.matchAll(REACHED)].map((one) => one[1] as string))].sort()
}

export function membersExported(stub: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const hit of stub.matchAll(EXPORTED)) {
    if (hit[1] !== undefined) held.add(hit[1])
    for (const one of (hit[2] ?? "").split(",")) {
      const named = one.trim()
      if (named !== "") held.add(named)
    }
  }
  return held
}

export function unnamedIn(bundle: string, stub: string): readonly string[] {
  const exported = membersExported(stub)
  return membersReached(bundle).filter((one) => !exported.has(one))
}

export function unnamedSaidAs(unnamed: readonly string[], stub: string): string {
  return (
    `the extension reaches vscode.${unnamed.join(", vscode.")}, which ${stub} does not export.` +
    ` A namespace import answers undefined for those, and undefined would empty a panel` +
    ` rather than say why. Add them to the stub.`
  )
}

export interface DrawnRow {
  readonly label: string | null
  readonly id: string | null
  readonly description: string | null
  readonly tooltip: string | null
  readonly resourceUri: string | null
  readonly contextValue: string | null
  readonly hasCommand: boolean
  readonly drewNothing: string | null
  readonly children: readonly DrawnRow[]
}

export interface DrawnPanel {
  readonly registered: boolean
  readonly failure: string | null
  readonly roots: readonly DrawnRow[]
}

export interface DrawnItem {
  readonly id: string
  readonly priority: number | null
  readonly text: string | null
  readonly tooltip: string | null
  readonly shown: boolean
}

export interface Drawn {
  readonly activateError: string | null
  readonly activateMs?: number
  readonly reportMs?: number
  readonly panels: Readonly<Record<string, DrawnPanel>>
  readonly statusBar: readonly DrawnItem[]
  readonly channels: Readonly<Record<string, readonly string[]>>
  readonly commands: readonly string[]
}

const PROBE = `import { createRequire } from "node:module"
import { writeFileSync } from "node:fs"
const require = createRequire(import.meta.url)
const vscode = require("vscode")
const at = process.argv[2]
let activateError = null
let report = { panels: {}, statusBar: [], channels: {}, commands: [] }
const began = Date.now()
try {
  const ext = await import("./bundle.js")
  await ext.activate(vscode.__makeContext())
} catch (err) {
  activateError = String((err && err.stack) || err)
}
const activateMs = Date.now() - began
const walked = Date.now()
try {
  report = await vscode.__report()
} catch (err) {
  activateError = (activateError === null ? "" : activateError + "\\n") + "the reading failed: " + String((err && err.stack) || err)
}
const reportMs = Date.now() - walked
writeFileSync(at, JSON.stringify({ activateError, activateMs, reportMs, ...report }))
process.exit(0)
`

export async function drawn(root: string, rawAt: string | null): Promise<Drawn> {
  const out = mkdtempSync(join(tmpdir(), "ext-panels-"))
  try {
    const built = await Bun.build({
      entrypoints: [join(root, ENTRY)],
      target: "node",
      external: ["vscode"],
      outdir: join(out, "built"),
    })
    if (!built.success) {
      throw new Error(`the bundle failed: ${built.logs.map((one) => String(one)).join("; ")}`)
    }
    const files = globSync("**/*.js", { cwd: join(out, "built") })
    const first = files[0]
    if (first === undefined) throw new Error("the bundle wrote no file, so nothing was drawn")

    const bundle = readFileSync(join(out, "built", first), "utf8")
    const stub = readFileSync(join(root, STUB), "utf8")
    const unnamed = unnamedIn(bundle, stub)
    if (unnamed.length > 0) throw new Error(unnamedSaidAs(unnamed, STUB))

    mkdirSync(join(out, "node_modules", "vscode"), { recursive: true })
    writeFileSync(join(out, "package.json"), `{ "type": "module" }\n`)
    writeFileSync(
      join(out, "node_modules", "vscode", "package.json"),
      `{ "name": "vscode", "version": "0.0.0", "type": "module", "main": "index.mjs" }\n`
    )
    cpSync(join(root, STUB), join(out, "node_modules", "vscode", "index.mjs"))
    writeFileSync(join(out, "bundle.js"), bundle)
    writeFileSync(join(out, "probe.mjs"), PROBE)
    const at = join(out, "drawn.json")
    const done = ran(["node", join(out, "probe.mjs"), at], {
      cwd: out,
      env: process.env,
      timeout: RUN_TIMEOUT_MS,
    })
    let read: string
    try {
      read = readFileSync(at, "utf8")
    } catch {
      const said = `${done.err}${done.out}`.trim()
      throw new Error(
        `node wrote no reading and exited ${String(done.code)}: ${said === "" ? "it said nothing" : said}`
      )
    }
    if (rawAt !== null) {
      mkdirSync(dirname(rawAt), { recursive: true })
      writeFileSync(rawAt, read)
    }
    return JSON.parse(read) as Drawn
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}
