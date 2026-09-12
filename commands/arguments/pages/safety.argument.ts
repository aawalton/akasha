import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const safety = {
  id: "01a094af-8c1d-74a1-98aa-4e845dc40cae",
  type: "argument",
  slug: "safety",
  said: "--safety",
  takes: "how safe Alan was over the stretch, from -2 to 5 in half steps",
  value: "text",
  placeholder: "level",
} as const satisfies Argument
