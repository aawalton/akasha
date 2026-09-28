import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSimilarSummoning2 = {
  id: "01a0e9f2-f149-7510-bd27-521d8f817288",
  type: "page-type/world-spell",
  slug: "super-supportive-similar-summoning-2",
  title: "Similar Summoning 2",
  world: "world/super-supportive",
  description:
    "A spell that summons a similar object from nearby, such as a desk from the next classroom.",
} as const satisfies WorldSpell
