import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const esoDoc = {
  id: "01a094a5-c384-7430-8c31-4756d17679a7",
  type: "argument",
  slug: "eso-doc",
  said: "--eso-doc",
  takes: "the documentation file the clone's API version is read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
