import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldClass = {
  id: "01a06558-a991-7fd2-bd7e-0b9a3c64d355",
  type: "page-type/page-type",
  slug: "world-class",
  definition: "what a character is, that they get better at by being it",
  pluralSlug: "classes",
  extends: ["page-type/world-mechanic"],
  parts: ["page-type/character-class"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-30T18:32:12.000Z",
} as const satisfies PageType
