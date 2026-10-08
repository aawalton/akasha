import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const inventoryPath = {
  id: "01a094ad-03b9-7df2-b5a7-13a9d9c389ca",
  type: "page-type/argument",
  slug: "inventory-path",
  said: "--inventory-path",
  takes: "the saved-variables file the addon's inventory capture is read from",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:12:41.785Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
