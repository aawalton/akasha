import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const loreCategory = {
  id: "01a0d5e2-67d9-7877-a138-61ca0968583e",
  type: "page-type/argument",
  slug: "lore-category",
  said: "--lore-category",
  takes: "the lore library category, by the game's number, whose books are made pages",
  value: "text",
  placeholder: "number",
} as const satisfies Argument
