import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAppeal = {
  id: "01a0e9f7-dff9-7559-9e80-7141612dcefb",
  type: "page-type/world-mechanic",
  slug: "super-supportive-appeal",
  title: "Appeal",
  world: "world/super-supportive",
  description:
    "The stat for how appealing a person is, split into sub-stats from facial symmetry to empathy.",
  createdAt: "2026-09-28T21:42:11.193Z",
  updatedAt: "2026-09-28T21:42:14.000Z",
} as const satisfies WorldMechanic
