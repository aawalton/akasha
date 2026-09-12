import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const inventoryPath = {
  id: "01a094ad-03b9-7df2-b5a7-13a9d9c389ca",
  type: "argument",
  slug: "inventory-path",
  said: "--inventory-path",
  takes: "the saved-variables file the addon's inventory capture is read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
