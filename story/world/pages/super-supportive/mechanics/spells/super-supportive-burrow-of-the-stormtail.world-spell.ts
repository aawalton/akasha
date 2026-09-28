import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveBurrowOfTheStormtail = {
  id: "01a0e9f9-7734-70e0-af9d-8909a983279c",
  type: "page-type/world-spell",
  slug: "super-supportive-burrow-of-the-stormtail",
  title: "Burrow of the Stormtail",
  world: "world/super-supportive",
  aliases: ["Burrow of the Raintail"],
  description: "A masterpiece ward named after an animal.",
} as const satisfies WorldSpell
