import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const chessResult = {
  id: "01a06582-bd62-7289-adc0-966f26ef44b4",
  type: "page-type/select-property",
  slug: "chess-result",
  propertySlug: "result",
  definition: "a game's final score",
  values: ["1-0", "0-1", "1/2-1/2", "*"],
  types: "ts",
  createdAt: "2026-09-03T04:24:22.114Z",
  updatedAt: "2026-09-22T13:42:40.000Z",
} as const satisfies SelectProperty
