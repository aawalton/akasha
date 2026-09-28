import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const HILL_COUNTRY_CLOCK: Clock = {
  opensAt: "2026-09-28T00:00:00.000Z",
  lights: [
    { until: 5 * 60 + 40, light: "night" },
    { until: 6 * 60 + 20, light: "dawn" },
    { until: 18 * 60, light: "day" },
    { until: 18 * 60 + 40, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(HILL_COUNTRY_CLOCK, reading)
}
