import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const rootSelector = {
  id: "01a094cb-c621-7e98-9170-1cb3be49e71d",
  type: "page-type/argument",
  slug: "root-selector",
  said: "--root-selector",
  takes: "the element the render fills, `main` where none is said",
  value: "text",
  placeholder: "sel",
  default: "main",
  createdAt: "2026-09-12T08:46:17.633Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
