import type { BannedTerm } from "akasha/domain/plain-language/standard-agent-english/term/banned-term/banned-term.page-type.types.ts"

export const holdInside = {
  id: "01a081fe-3ea9-770a-9afd-6d05c8f610b6",
  type: "page-type/banned-term",
  slug: "hold-inside",
  spelling: "hold",
  variants: ["holds", "holding", "held"],
  definition: "having something inside",
  instead: "have",
  replacementPatterns: [
    { frame: "prose-frame/object", fromPattern: "holds [object]", toPattern: "has [object]" },
    { frame: "prose-frame/object", fromPattern: "hold [object]", toPattern: "have [object]" },
    { frame: "prose-frame/object", fromPattern: "held [object]", toPattern: "had [object]" },
    { frame: "prose-frame/fronted", fromPattern: "holds", toPattern: "has" },
    { frame: "prose-frame/fronted", fromPattern: "hold", toPattern: "have" },
    { frame: "prose-frame/fronted", fromPattern: "held", toPattern: "had" },
    {
      frame: "prose-frame/participle",
      fromPattern: "holding [object]",
      toPattern: "with [object]",
    },
    { frame: "prose-frame/placed", fromPattern: "is held in [place]", toPattern: "is in [place]" },
  ],
} as const satisfies BannedTerm
