import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const album = {
  id: "01a094dc-d46d-7fbd-99ac-6d3404361ed8",
  type: "page-type/argument",
  slug: "album",
  said: "--url",
  takes: "the album to fetch, said as its share URL",
  value: "text",
  placeholder: "share-url",
  createdAt: "2026-09-12T09:04:55.405Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
