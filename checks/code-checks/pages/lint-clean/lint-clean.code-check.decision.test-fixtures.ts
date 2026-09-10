import { mkdirSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "@akasha/utils/run/running"
import { rootOf } from "../../../../commands/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"

export const READS: readonly string[] = [".ts", ".tsx", ".css"]

export const CLEAN = "export function held(): number {\n  return 1\n}\n"

export const UNUSED = "export function held(): number {\n  const spare = 2\n  return 1\n}\n"

export const RULE = "lint/correctness/noUnusedVariables"

export const STYLED = ".readout-ring {\n  color: red;\n}\n"

const REPO_AT = rootOf(import.meta.dir)

const MODULES = "node_modules"

const CONFIG = "biome.json"

const SETTINGS =
  '{"files":{"includes":["**/*.ts","**/*.tsx","**/*.css"]},' +
  '"formatter":{"enabled":false},"assist":{"enabled":false},"linter":{"rules":' +
  '{"recommended":false,"correctness":{"noUnusedVariables":"error"}}}}\n'

export const scratch = scratchWorld()

export function said(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

export function repo(files: Record<string, string>, linter = true): string {
  const root = realpathSync(scratch.rootFor("lint-clean-"))
  writeFileSync(join(root, CONFIG), SETTINGS)
  if (linter) symlinkSync(join(REPO_AT, MODULES), join(root, MODULES))
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

export function tracked(files: Record<string, string>): string {
  const root = repo(files)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
