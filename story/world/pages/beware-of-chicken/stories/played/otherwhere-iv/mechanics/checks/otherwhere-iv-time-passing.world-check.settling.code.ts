import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const HILLS_LATE_SPRING: Clock = {
  opensAt: "2026-09-28T00:00:00.000Z",
  lights: [
    { until: 5 * 60, light: "night" },
    { until: 5 * 60 + 30, light: "dawn" },
    { until: 19 * 60, light: "day" },
    { until: 19 * 60 + 30, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(HILLS_LATE_SPRING, reading)
}
