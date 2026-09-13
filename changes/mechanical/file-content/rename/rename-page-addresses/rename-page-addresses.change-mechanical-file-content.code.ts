import { restatedIn } from "akasha/changes/modules/address-restating/address-restating.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type RenamePageAddressesAsked = {
  readonly moved: Readonly<Record<string, string>>
}

export function renamePageAddresses(world: World, given: RenamePageAddressesAsked): Said {
  return restatedIn(world, new Map(Object.entries(given.moved)))
}

export function runChange(world: World, given: RenamePageAddressesAsked): Promise<Said> {
  return Promise.resolve(renamePageAddresses(world, given))
}
