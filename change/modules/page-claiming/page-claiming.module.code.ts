import { dirname } from "node:path"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { endingOf } from "akasha/page/index/modules/extension-carrying/extension-carrying.module.code.ts"
import { claimsOf } from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import {
  typeIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { dashEachCapital } from "akasha/page/naming/folding/modules/dash-each-capital/dash-each-capital.module.code.ts"

function endingsOf(world: World, value: Value): ReadonlySet<string> {
  const found = new Set<string>()
  const carried = world.index.extensionPropertiesAt().get(typeIn(value) ?? "")
  if (carried === undefined) return found
  for (const [key, held] of Object.entries(value)) {
    if (held !== true) continue
    const extensionName = carried.get(dashEachCapital(key))
    if (extensionName !== undefined) found.add(extensionName)
  }
  return found
}

function endedBeside(world: World, at: string, value: Value): readonly string[] {
  const endings = endingsOf(world, value)
  if (endings.size === 0) return []
  const folder = dirname(at)
  return world
    .under(folder)
    .filter((one) => dirname(one) === folder && endings.has(endingOf(one) ?? ""))
}

export function claimedIn(world: World, at: string, value: Value): readonly string[] {
  const claimed = claimsOf(
    value,
    at,
    world.root,
    world.index.filePropertiesAt(),
    world.index.sidecarsAt(),
    world.index.uncommittedFiledAt(),
    (one) => world.bodyOf(one) !== null
  )
  const found = new Set([...claimed, ...endedBeside(world, at, value)])
  const held = [...found].filter((one) => one !== at && world.bodyOf(one) !== null)
  return [at, ...held]
}
