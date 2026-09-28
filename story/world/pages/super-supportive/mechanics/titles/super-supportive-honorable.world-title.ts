import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveHonorable = {
  id: "01a0e9f0-a7e4-780b-a842-2714206428b8",
  type: "page-type/world-title",
  slug: "super-supportive-honorable",
  title: "Honorable",
  world: "world/super-supportive",
  description: "An Artonan honorific title.",
} as const satisfies WorldTitle
