import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const library = {
  id: "01a094c7-8e28-7c27-b94c-6d473bda18c4",
  type: "argument",
  slug: "library",
  said: "--library",
  takes: "the upstream library acted on: housing, lib-map-data, lib-treasure or lib-zone",
  value: "text",
  placeholder: "library",
} as const satisfies Argument
