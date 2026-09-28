import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDaharsee = {
  id: "01a0e9f8-aa22-7002-b6d8-9617ce569bee",
  type: "page-type/world-mechanic",
  slug: "super-supportive-daharsee",
  title: "Daharsee",
  world: "world/super-supportive",
  aliases: ["remnant of a wizard's command"],
  description: "The echo of a caster's own command left in a spell, like their voice distorted.",
} as const satisfies WorldMechanic
