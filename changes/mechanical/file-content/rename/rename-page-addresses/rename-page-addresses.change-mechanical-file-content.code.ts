import { restatedOver } from "akasha/changes/modules/address-restating/address-restating.module.code.ts"
import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { pathsThere, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const ADDRESS = /^[a-z][a-z0-9]*(-[a-z0-9]+)*\/[a-z][a-z0-9]*(-[a-z0-9]+)*$/

const NO_ADDRESS = "is no address, an address being a page type and a slug parted by `/`"

export type RenamePageAddressesAsked = {
  readonly moved: Readonly<Record<string, string>>
}

function refusalIn(moved: ReadonlyMap<string, string>): string | null {
  if (moved.size === 0) return "no address was handed in, so no address is restated"
  for (const [was, now] of moved) {
    if (!ADDRESS.test(was)) return `\`${was}\` ${NO_ADDRESS}`
    if (!ADDRESS.test(now)) return `\`${now}\` ${NO_ADDRESS}`
    if (was === now) return `\`${now}\` is the address that page already carries`
  }
  return null
}

export function renamePageAddresses(world: World, given: RenamePageAddressesAsked): Said {
  const moved = new Map(Object.entries(given.moved))
  const why = refusalIn(moved)
  if (why !== null) return refusing(why)
  let paths: readonly string[]
  try {
    paths = pathsThere(world)
  } catch (cause) {
    const held = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${held}, so no address was restated`)
  }
  return stating(restatedOver(paths, world.textOf, moved))
}

export function runChange(world: World, given: RenamePageAddressesAsked): Promise<Said> {
  return Promise.resolve(renamePageAddresses(world, given))
}
