import { founded } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const LOOSE_AT = "akasha/one/answering/answering.module.ts"

export const NESTED_AT = "akasha/one/modules/answering/answering.module.ts"

export const BODY = "export const answering = {} as const\n"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-module-under-modules-")
  founded(root)
  return root
}
