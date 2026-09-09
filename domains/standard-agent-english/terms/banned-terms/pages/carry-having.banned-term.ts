import type { BannedTerm } from "../banned-term.page-type.ts"

export const carryHaving = {
  id: "01a08201-dca4-73e6-9ae8-de460a3cf483",
  pageTypeSlug: "banned-term",
  type: "banned-term",
  slug: "carry-having",
  spelling: "carry",
  variants: ["carries", "carrying", "carried"],
  definition: "having something",
  instead: "have",
  replacementPatterns: [
    { frame: "object", fromPattern: "carries [object]", toPattern: "has [object]" },
    { frame: "object", fromPattern: "carry [object]", toPattern: "have [object]" },
    { frame: "object", fromPattern: "carried [object]", toPattern: "had [object]" },
    { frame: "fronted", fromPattern: "carries", toPattern: "has" },
    { frame: "fronted", fromPattern: "carry", toPattern: "have" },
    { frame: "fronted", fromPattern: "carried", toPattern: "had" },
    { frame: "participle", fromPattern: "carrying [object]", toPattern: "with [object]" },
    { frame: "placed", fromPattern: "is carried in [place]", toPattern: "is in [place]" },
  ],
} as const satisfies BannedTerm
