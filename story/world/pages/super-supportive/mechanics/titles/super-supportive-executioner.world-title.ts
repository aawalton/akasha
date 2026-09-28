import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveExecutioner = {
  id: "01a0e9fa-4782-7151-9741-44feecbd4f04",
  type: "page-type/world-title",
  slug: "super-supportive-executioner",
  title: "Executioner",
  world: "world/super-supportive",
  aliases: ["higher executioner", "Superior Executioner"],
  description: "An Artonan official who handles crimes committed by wizards.",
} as const satisfies WorldTitle
