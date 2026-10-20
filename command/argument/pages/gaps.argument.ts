import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const gaps = {
  id: "01a159fe-db28-77d1-b5ed-cd438a31a7e2",
  type: "page-type/argument",
  slug: "gaps",
  said: "--gaps",
  takes:
    "a character or reading, named the way a build is, whose shortfalls from the first build are shown",
  value: "text",
  placeholder: "character",
  createdAt: "2026-10-20T15:47:16.903Z",
  updatedAt: "2026-10-20T15:47:16.903Z",
} as const satisfies Argument
