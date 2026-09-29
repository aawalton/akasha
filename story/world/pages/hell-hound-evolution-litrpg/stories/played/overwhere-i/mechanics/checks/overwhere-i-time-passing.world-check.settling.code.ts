import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const GREYFEN_CLOCK: Clock = {
  opensAt: "2026-09-29T00:00:00.000Z",
  lights: [
    { until: 5 * 60 + 50, light: "night" },
    { until: 6 * 60 + 30, light: "dawn" },
    { until: 18 * 60 + 50, light: "day" },
    { until: 19 * 60 + 30, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(GREYFEN_CLOCK, reading)
}
