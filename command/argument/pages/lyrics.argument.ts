import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const lyrics = {
  id: "01a094e9-e965-7336-a0b7-66b6196bc533",
  type: "page-type/argument",
  slug: "lyrics",
  said: "--lyrics",
  takes: "the words the song sings",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T09:19:12.741Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
