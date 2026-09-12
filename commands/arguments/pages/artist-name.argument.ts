import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const artistName = {
  id: "01a094ca-b0d9-75d7-ba17-7c37b4c19dae",
  type: "argument",
  slug: "artist-name",
  said: "--name",
  takes: "the artist looked for by name",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
