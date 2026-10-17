import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const THORNFORD: Clock = {
  opensAt: "2026-04-28T00:00:00.000Z",
  lights: [
    { until: 5 * 60, light: "night" },
    { until: 5 * 60 + 45, light: "dawn" },
    { until: 20 * 60 + 45, light: "day" },
    { until: 21 * 60 + 30, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(THORNFORD, reading)
}
