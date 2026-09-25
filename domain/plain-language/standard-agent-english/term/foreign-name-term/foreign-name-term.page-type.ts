import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const foreignNameTerm = {
  id: "01a07c6e-df85-7cad-a74c-d84a45b5f15c",
  type: "page-type/page-type",
  slug: "foreign-name-term",
  definition: "a name whose sense is set outside akasha",
  extends: ["page-type/allowed-term"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
