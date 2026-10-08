import type { Gym } from "akasha/alan/value/health/fitness/gym/gym.page-type.types.ts"

export const home = {
  id: "01a11b35-8015-7cd6-ba4b-9656daeca5da",
  type: "page-type/gym",
  slug: "home",
  title: "Home",
  everyImplement: false,
  holds: [
    "fitness-equipment/dumbbells",
    "fitness-equipment/kettlebells",
    "fitness-equipment/adjustable-bench",
    "fitness-equipment/hand-gripper",
  ],
  createdAt: "2026-10-08T11:10:53.461Z",
  updatedAt: "2026-10-08T11:10:56.000Z",
} as const satisfies Gym
