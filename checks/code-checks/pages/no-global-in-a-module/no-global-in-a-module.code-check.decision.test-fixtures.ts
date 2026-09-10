import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded } from "../../../modules/scratch/check-scratch.module.code.ts"

export const ONE_AT = "akasha/one.module.code.ts"

export const TWO_AT = "akasha/two.module.code.ts"

export const DECLARED_AT = "akasha/held.type-declaration.d.ts"

const NAMES = "  const HELD: number\n\n  interface Held {\n    one: number\n  }\n"

export const CARRIES = `export const away = 1\n\ndeclare global {\n${NAMES}}\n`

export const CLEAN = "export const away = 1\n"

export const LIFTED = "declare const HELD: number\n\ninterface Held {\n  one: number\n}\n"

export const TWICE = `${CARRIES}\ndeclare global {\n  const OTHER: string\n}\n`

export const scratch = scratchWorld()

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-no-global-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-no-global-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
