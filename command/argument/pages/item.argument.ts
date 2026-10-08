import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const item = {
  id: "01a094c6-e184-7846-a75c-e39a7efec743",
  type: "page-type/argument",
  slug: "item",
  said: "--item",
  takes: "the item acted on, as a bare item id or as a game item link",
  value: "text",
  placeholder: "item",
  createdAt: "2026-09-12T08:40:56.964Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
