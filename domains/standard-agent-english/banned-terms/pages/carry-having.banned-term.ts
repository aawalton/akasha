import type { BannedTerm } from "../banned-term.page-type.ts"

export const carryHaving = {
  id: "01a08201-dca4-73e6-9ae8-de460a3cf483",
  pageTypeSlug: "banned-term",
  slug: "carry-having",
  spelling: "carry",
  definition: "having something",
  instead: "have",
  replacementPatterns: [
    { fromPattern: "carries [object]", toPattern: "has [object]" },
    { fromPattern: "carry [object]", toPattern: "have [object]" },
    { fromPattern: "carrying [object]", toPattern: "with [object]" },
    { fromPattern: "is carried in [place]", toPattern: "is in [place]" },
  ],
} as const satisfies BannedTerm
