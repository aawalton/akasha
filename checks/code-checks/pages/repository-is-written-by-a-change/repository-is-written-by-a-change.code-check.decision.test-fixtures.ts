import { listedFiled } from "@akasha/indexes/testing"
import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded, typed } from "../../../modules/scratch/check-scratch.module.code.ts"

export const AT = "checks/one/one.module.code.ts"

export const WRITES =
  'import { writeFileSync } from "node:fs"\n' +
  'import { join } from "node:path"\n' +
  "export function one(given: { root: string }): void {\n" +
  '  writeFileSync(join(given.root, "a.ts"), "")\n' +
  "}\n"

export const READS = 'import { join } from "node:path"\nexport const a = join("b", "c.ts")\n'

const CHANGE_AT = "changes/change.domain.ts"

const COMMAND_AT = "commands/command.domain.ts"

const CHANGE_ID = "01a08299-65c2-7001-8000-000000000001"

const COMMAND_ID = "01a08299-65c2-7002-8000-000000000002"

const IGNORE_AT = ".gitignore"

const IGNORES = "*.uncommitted.*\n.supervisors/\nnode_modules/\n"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-written-by-")
  founded(root)
  writing(root, IGNORE_AT, IGNORES)
  typed(root, "domain", "page")
  listedFiled(root, "domain", "change", [{ path: CHANGE_AT, id: CHANGE_ID }])
  listedFiled(root, "domain", "command", [{ path: COMMAND_AT, id: COMMAND_ID }])
  return root
}

export function tracked(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, said] of Object.entries(files)) writing(root, path, said)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
