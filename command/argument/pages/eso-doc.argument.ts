import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const esoDoc = {
  id: "01a094a5-c384-7430-8c31-4756d17679a7",
  type: "page-type/argument",
  slug: "eso-doc",
  said: "--eso-doc",
  takes: "the documentation file the clone's API version is read from",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:04:46.596Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
