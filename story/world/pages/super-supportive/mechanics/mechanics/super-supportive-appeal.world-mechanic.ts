import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAppeal = {
  id: "01a0e9f7-dff9-7559-9e80-7141612dcefb",
  type: "page-type/world-mechanic",
  slug: "super-supportive-appeal",
  title: "Appeal",
  world: "world/super-supportive",
  description:
    "The stat for how appealing a person is, split into sub-stats from facial symmetry to empathy.",
} as const satisfies WorldMechanic
