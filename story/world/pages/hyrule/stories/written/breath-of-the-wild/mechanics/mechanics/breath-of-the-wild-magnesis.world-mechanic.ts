import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildMagnesis = {
  id: "01a10331-b562-78c3-b148-5944ab2ea16b",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-magnesis",
  title: "Magnesis",
  world: "world/hyrule",
  description:
    "A Sheikah Slate rune that shows metal glowing pink and lifts and moves metallic objects by magnetism.",
  unrevealed: false,
} as const satisfies WorldMechanic
