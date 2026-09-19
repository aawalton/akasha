import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldClass = {
  id: "01a06558-a991-7fd2-bd7e-0b9a3c64d355",
  type: "page-type/page-type",
  slug: "world-class",
  definition: "what a character is, that they get better at by being it",
  pluralSlug: "classes",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
