import type { Said } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  valueRemoved,
} from "akasha/change/modules/value-removing/value-removing.module.code.ts"

export type RemovePropertyValueAsked = Asked

export function removePropertyValue(world: World, given: RemovePropertyValueAsked): Said {
  return valueRemoved(world, given)
}

export function runChange(world: World, given: RemovePropertyValueAsked): Said {
  return removePropertyValue(world, given)
}
