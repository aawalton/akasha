import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const lyrics = {
  id: "01a094e9-e965-7336-a0b7-66b6196bc533",
  type: "argument",
  slug: "lyrics",
  said: "--lyrics",
  takes: "the words the song sings",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
