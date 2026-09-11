import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { founded } from "../../../modules/scratch/check-scratch.module.code.ts"

export const AT = "akasha/held.module.code.ts"

export const NAMED_AT = "akasha/ledger.module.code.ts"

export const NAMED = "export const one = 1\n"

export const BESIDE = 'import { one } from "./ledger.module.code.ts"\n'

export const ROOTED = 'import { one } from "akasha/ledger.module.code.ts"\n'

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-relative-specifier-")
  founded(root)
  return root
}
