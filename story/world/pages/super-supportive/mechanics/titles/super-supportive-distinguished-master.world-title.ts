import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveDistinguishedMaster = {
  id: "01a0e9f0-a7e4-7ca7-a54a-88523e2204ce",
  type: "page-type/world-title",
  slug: "super-supportive-distinguished-master",
  title: "Distinguished Master",
  world: "world/super-supportive",
  aliases: ["Distinguished"],
  description: "A high Artonan academic title.",
} as const satisfies WorldTitle
