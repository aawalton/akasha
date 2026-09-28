import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveGorgonsGaze = {
  id: "01a0e9f1-cfc2-7633-b5d7-36028f18167b",
  type: "page-type/world-mechanic",
  slug: "super-supportive-gorgons-gaze",
  title: "Gorgon's gaze",
  world: "world/super-supportive",
  description:
    "A meeting of Gorgon's eyes that floods a person with profound memories and knocks them out for hours.",
} as const satisfies WorldMechanic
