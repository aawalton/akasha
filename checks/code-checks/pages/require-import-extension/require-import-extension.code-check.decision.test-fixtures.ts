import { ran } from "@akasha/utils/run/running"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { founded } from "../../../modules/scratch/check-scratch.module.code.ts"

export const AT = "akasha/held.module.code.ts"

export const NAMED_AT = "akasha/ledger.module.code.ts"

export const NAMED = "export const one = 1\n"

export const BARE = 'import { one } from "./ledger.module.code"\n'

export const SPELLED = 'import { one } from "./ledger.module.code.ts"\n'

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-import-extension-")
  founded(root)
  return root
}

export function tracked(root: string, files: Readonly<Record<string, string>>): string {
  for (const [path, said] of Object.entries(files)) writing(root, path, said)
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
