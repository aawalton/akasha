import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  valueRemoved,
} from "akasha/changes/modules/value-removing/value-removing.module.code.ts"

export type RemovePropertyValueAsked = Asked

export function removePropertyValue(world: World, given: RemovePropertyValueAsked): Said {
  return valueRemoved(world, given)
}

export function runChange(world: World, given: RemovePropertyValueAsked): Said {
  return removePropertyValue(world, given)
}
