import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveTheGloss = {
  id: "01a0e9f2-f149-751c-8c9c-e2787280992a",
  type: "page-type/world-spell",
  slug: "super-supportive-the-gloss",
  title: "The Gloss",
  world: "world/super-supportive",
  aliases: ["Glossed", "uberluck wordchain"],
  description: "The highest-potency luck chain available to humanity.",
} as const satisfies WorldSpell
