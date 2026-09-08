import type { BannedTerm } from "../banned-term.page-type.ts"

export const holdInside = {
  id: "01a081fe-3ea9-770a-9afd-6d05c8f610b6",
  pageTypeSlug: "banned-term",
  slug: "hold-inside",
  spelling: "hold",
  definition: "having something inside",
  instead: "have",
  replacementPatterns: [
    { fromPattern: "holds [object]", toPattern: "has [object]" },
    { fromPattern: "hold [object]", toPattern: "have [object]" },
    { fromPattern: "holding [object]", toPattern: "with [object]" },
    { fromPattern: "is held in [place]", toPattern: "is in [place]" },
  ],
} as const satisfies BannedTerm
