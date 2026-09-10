import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded } from "../../../modules/scratch/check-scratch.module.code.ts"

export const AT = "checks/held.ts"

export const READ_AND_USED =
  "function one(text: string): undefined {\n  const held = JSON.parse(text)\n  use(held)\n}\n"

export const scratch = scratchWorld()

export function rooted(
  files: Readonly<Record<string, string>>,
  prefix: string = "akasha-boundary-"
): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  for (const [path, body] of Object.entries(files)) writing(root, path, body)
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted(files, "akasha-boundary-audit-")
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
