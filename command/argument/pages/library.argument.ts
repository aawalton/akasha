import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const library = {
  id: "01a094c7-8e28-7c27-b94c-6d473bda18c4",
  type: "page-type/argument",
  slug: "library",
  said: "--library",
  takes: "the upstream library acted on: housing, lib-map-data, lib-treasure or lib-zone",
  value: "text",
  placeholder: "library",
  createdAt: "2026-09-12T08:41:41.160Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
