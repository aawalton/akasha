import { founded } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const AT = "akasha/held.module.code.ts"

export const NAMED_AT = "akasha/ledger.module.code.ts"

export const NESTED_AT = "akasha/checks/modules/checking/checking.module.code.ts"

export const NAMED = "export const one = 1\n"

export const BARE = 'import { one } from "./ledger.module.code"\n'

export const SPELLED = 'import { one } from "./ledger.module.code.ts"\n'

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-import-extension-")
  founded(root)
  return root
}
