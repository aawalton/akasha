import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersPresence = {
  id: "01a0de49-9786-7ee5-874a-12448dae335a",
  type: "page-type/page-type",
  slug: "partners-presence",
  definition: "how warmly a character in Partners carries with others",
  pluralSlug: "presence",
  extends: ["page-type/partners-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
