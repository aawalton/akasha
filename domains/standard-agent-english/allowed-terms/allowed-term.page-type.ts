import type { PageType } from "@akasha/pages/page-type"
import type { Term } from "../terms/term.page-type.ts"

export type AllowedTerm = Term

export const allowedTerm = {
  id: "01a081ea-6fce-7964-b581-84f1a80077c6",
  pageTypeSlug: "page-type",
  slug: "allowed-term",
  definition: "one term akasha writes",
  pluralSlug: "allowed-terms",
  extends: ["page-type/term"],
} as const satisfies PageType
