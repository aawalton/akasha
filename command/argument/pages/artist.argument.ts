import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const artist = {
  id: "01a094bf-cc15-7b9e-95e7-e80c449c3cce",
  type: "page-type/argument",
  slug: "artist",
  said: "--artist",
  takes: "the artist the candidates are held to, matched without regard to case",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:33:12.725Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
