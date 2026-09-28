import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const CARROWGATE: Clock = {
  opensAt: "2026-09-28T00:00:00.000Z",
  lights: [
    { until: 5 * 60 + 45, light: "night" },
    { until: 6 * 60 + 20, light: "dawn" },
    { until: 18 * 60 + 5, light: "day" },
    { until: 18 * 60 + 45, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(CARROWGATE, reading)
}
