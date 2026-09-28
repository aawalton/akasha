import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveChoosePersona = {
  id: "01a0e9f2-9a51-7ffd-ab8a-f7b990221c0e",
  type: "page-type/world-mechanic",
  slug: "super-supportive-choose-persona",
  title: "Choose Persona",
  world: "world/super-supportive",
  aliases: ["ACTIVE PERSONA"],
  description: "A privilege to pick which of two Avowed profiles is shown.",
} as const satisfies WorldMechanic
