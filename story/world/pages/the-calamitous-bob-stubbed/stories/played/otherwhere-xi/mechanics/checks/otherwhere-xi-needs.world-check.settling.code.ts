import {
  needsSettled,
  type Settled,
} from "akasha/story/world/mechanics/modules/needs-weighing/needs-weighing.module.code.ts"

export function settled(reading: unknown): Settled {
  return needsSettled(reading)
}
