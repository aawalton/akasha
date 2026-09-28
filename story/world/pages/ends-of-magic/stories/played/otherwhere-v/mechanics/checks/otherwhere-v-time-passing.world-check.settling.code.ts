import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const HOLLOW_AUTUMN: Clock = {
  opensAt: "2026-09-28T00:00:00.000Z",
  lights: [
    { until: 6 * 60, light: "night" },
    { until: 6 * 60 + 40, light: "dawn" },
    { until: 18 * 60 + 10, light: "day" },
    { until: 18 * 60 + 50, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(HOLLOW_AUTUMN, reading)
}
