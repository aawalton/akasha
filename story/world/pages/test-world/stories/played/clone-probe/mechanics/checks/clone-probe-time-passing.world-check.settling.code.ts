import {
  type Clock,
  type Settled,
  timePassingSettled,
} from "akasha/story/world/mechanics/modules/time-passing/time-passing.module.code.ts"

const TEST_WORLD_DAY: Clock = {
  opensAt: "2026-10-27T00:00:00.000Z",
  lights: [
    { until: 6 * 60, light: "night" },
    { until: 6 * 60 + 30, light: "dawn" },
    { until: 18 * 60, light: "day" },
    { until: 18 * 60 + 30, light: "dusk" },
    { until: 24 * 60, light: "night" },
  ],
}

export function settled(reading: unknown): Settled {
  return timePassingSettled(TEST_WORLD_DAY, reading)
}
