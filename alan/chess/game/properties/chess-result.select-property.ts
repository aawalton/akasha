import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessResult = {
  id: "01a06582-bd62-7289-adc0-966f26ef44b4",
  type: "page-type/select-property",
  slug: "chess-result",
  propertySlug: "result",
  definition: "a game's final score",
  values: ["1-0", "0-1", "1/2-1/2", "*"],
  types: "ts",
} as const satisfies SelectProperty
