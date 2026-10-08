import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const mainSha = {
  id: "01a094c8-7882-7be9-b0d2-7169c5ecae92",
  type: "page-type/argument",
  slug: "main-sha",
  said: "--main-sha",
  takes: "the code-repo commit the cut was taken at",
  value: "text",
  placeholder: "sha",
  createdAt: "2026-09-12T08:42:41.154Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
