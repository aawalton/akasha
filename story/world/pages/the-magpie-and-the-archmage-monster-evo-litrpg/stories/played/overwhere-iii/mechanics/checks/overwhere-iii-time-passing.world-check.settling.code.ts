import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const WRENWOOD: Clock = {
  opensAt: "2026-09-29T00:00:00.000Z",
  lights: [
    { until: 6 * 60 + 30, light: "night" },
    { until: 7 * 60 + 30, light: "dawn" },
    { until: 17 * 60, light: "day" },
    { until: 18 * 60, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(WRENWOOD, reading)
}
