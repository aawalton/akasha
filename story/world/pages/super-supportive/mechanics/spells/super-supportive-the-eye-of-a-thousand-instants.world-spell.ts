import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveTheEyeOfAThousandInstants = {
  id: "01a0e9f7-9e6e-732c-914e-5f022d26ff64",
  type: "page-type/world-spell",
  slug: "super-supportive-the-eye-of-a-thousand-instants",
  title: "The Eye of a Thousand Instants",
  world: "world/super-supportive",
  description:
    "An old wordchain of twenty words and gestures that gives long-distance vision for a moment.",
} as const satisfies WorldSpell
