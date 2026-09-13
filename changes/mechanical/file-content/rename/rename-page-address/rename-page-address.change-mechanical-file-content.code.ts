import { restatedIn } from "akasha/changes/modules/address-restating/address-restating.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type RenamePageAddressAsked = {
  readonly was: string
  readonly now: string
}

export function renamePageAddress(world: World, given: RenamePageAddressAsked): Said {
  return restatedIn(world, new Map([[given.was, given.now]]))
}

export function runChange(world: World, given: RenamePageAddressAsked): Promise<Said> {
  return Promise.resolve(renamePageAddress(world, given))
}
