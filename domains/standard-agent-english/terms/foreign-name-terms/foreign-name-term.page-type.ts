import type { PageType } from "@akasha/pages/page-type"

export const foreignNameTerm = {
  id: "01a07c6e-df85-7cad-a74c-d84a45b5f15c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "foreign-name-term",
  definition: "one name whose sense is set outside akasha",
  pluralSlug: "foreign-name-terms",
  extends: ["page-type/allowed-term"],
  types: "ts",
} as const satisfies PageType
