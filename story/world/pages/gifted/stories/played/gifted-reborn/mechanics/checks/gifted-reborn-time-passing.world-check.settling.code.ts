import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const HORNDALE_WINTER: Clock = {
  opensAt: "2026-10-27T00:00:00.000Z",
  lights: [
    { until: 7 * 60 + 10, light: "night" },
    { until: 7 * 60 + 40, light: "dawn" },
    { until: 16 * 60 + 30, light: "day" },
    { until: 17 * 60 + 10, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(HORNDALE_WINTER, reading)
}
