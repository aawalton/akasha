import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAffixation = {
  id: "01a0e9f0-3df9-7aa9-9204-26779982515a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-affixation",
  title: "Affixation",
  world: "world/super-supportive",
  aliases: ["affixing", "finalize affixation"],
  description: "The binding of a person's chosen class, skills and stat points into them for good.",
} as const satisfies WorldMechanic
