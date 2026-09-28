import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const CHICAGO_WINTER: Clock = {
  opensAt: "2037-01-31T00:00:00.000Z",
  lights: [
    { until: 6 * 60 + 35, light: "night" },
    { until: 7 * 60 + 5, light: "dawn" },
    { until: 16 * 60 + 55, light: "day" },
    { until: 17 * 60 + 25, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(CHICAGO_WINTER, reading)
}
