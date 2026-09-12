import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const album = {
  id: "01a094dc-d46d-7fbd-99ac-6d3404361ed8",
  type: "argument",
  slug: "album",
  said: "--url",
  takes: "the album to fetch, said as its share URL",
  value: "text",
  placeholder: "share-url",
} as const satisfies Argument
