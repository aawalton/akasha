import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const rootSelector = {
  id: "01a094cb-c621-7e98-9170-1cb3be49e71d",
  type: "argument",
  slug: "root-selector",
  said: "--root-selector",
  takes: "the element the render fills, `main` where none is said",
  value: "text",
  placeholder: "sel",
} as const satisfies Argument
