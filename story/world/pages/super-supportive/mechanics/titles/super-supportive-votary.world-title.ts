import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveVotary = {
  id: "01a0e9f5-fdee-7136-80c2-de03fd016d99",
  type: "page-type/world-title",
  slug: "super-supportive-votary",
  title: "votary",
  world: "world/super-supportive",
  aliases: ["votaryship"],
  description: "A wizard who serves as assistant and dedicated caster, often to a single knight.",
} as const satisfies WorldTitle
