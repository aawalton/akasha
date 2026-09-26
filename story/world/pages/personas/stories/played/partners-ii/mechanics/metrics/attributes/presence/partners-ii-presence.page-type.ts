import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiPresence = {
  id: "01a0de4a-4a00-735e-bd22-eec11ce1de70",
  type: "page-type/page-type",
  slug: "partners-ii-presence",
  definition: "how strongly a character in Partners II carries in company",
  pluralSlug: "presence",
  extends: ["page-type/partners-ii-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
