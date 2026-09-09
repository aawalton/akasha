import type { PageType } from "@akasha/pages/page-type"

export const allowedTerm = {
  id: "01a081ea-6fce-7964-b581-84f1a80077c6",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "allowed-term",
  definition: "one term akasha writes",
  pluralSlug: "allowed-terms",
  extends: ["page-type/term"],
  types: "ts",
} as const satisfies PageType
