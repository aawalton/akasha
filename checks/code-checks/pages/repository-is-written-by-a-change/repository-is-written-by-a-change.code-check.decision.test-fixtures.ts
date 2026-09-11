import { listedFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
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

const CHANGE_AT = "changes/change.page-type.ts"

const COMMAND_AT = "commands/command.page-type.ts"

const NAMESAKE_AT = "design/primitives/command/command.module.ts"

const NAMESAKE_ID = "01a08299-65c2-7003-8000-000000000003"

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
  typed(root, "module", "domain")
  listedFiled(root, "page-type", "change", [{ path: CHANGE_AT, id: CHANGE_ID }])
  listedFiled(root, "page-type", "command", [{ path: COMMAND_AT, id: COMMAND_ID }])
  listedFiled(root, "module", "command", [{ path: NAMESAKE_AT, id: NAMESAKE_ID }])
  return root
}
