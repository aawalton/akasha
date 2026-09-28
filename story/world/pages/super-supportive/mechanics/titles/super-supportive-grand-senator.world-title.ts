import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveGrandSenator = {
  id: "01a0e9fa-4782-7203-b475-5fd419edab84",
  type: "page-type/world-title",
  slug: "super-supportive-grand-senator",
  title: "Grand Senator",
  world: "world/super-supportive",
  description:
    "The title of a wizard whose collected voting power crosses a minimum threshold, giving a seat in the Grand Senate.",
} as const satisfies WorldTitle
