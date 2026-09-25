import type { BannedTerm } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const carryHaving = {
  id: "01a08201-dca4-73e6-9ae8-de460a3cf483",
  type: "page-type/banned-term",
  slug: "carry-having",
  spelling: "carry",
  variants: ["carries", "carrying", "carried"],
  definition: "having something",
  instead: "have",
  replacementPatterns: [
    { frame: "prose-frame/object", fromPattern: "carries [object]", toPattern: "has [object]" },
    { frame: "prose-frame/object", fromPattern: "carry [object]", toPattern: "have [object]" },
    { frame: "prose-frame/object", fromPattern: "carried [object]", toPattern: "had [object]" },
    { frame: "prose-frame/fronted", fromPattern: "carries", toPattern: "has" },
    { frame: "prose-frame/fronted", fromPattern: "carry", toPattern: "have" },
    { frame: "prose-frame/fronted", fromPattern: "carried", toPattern: "had" },
    {
      frame: "prose-frame/participle",
      fromPattern: "carrying [object]",
      toPattern: "with [object]",
    },
    {
      frame: "prose-frame/placed",
      fromPattern: "is carried in [place]",
      toPattern: "is in [place]",
    },
  ],
} as const satisfies BannedTerm
