import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const indexSchema = {
  id: "01a04d79-852a-71ed-b817-7b06efee79d5",
  pageTypeSlug: "domain",
  slug: "index-schema",
  definition: "an index from a property to the shape of the value it holds",
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "A schema file is found by scope, then property, then value, as an identity file is.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is `page-property-type`, the page type every property is.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the property's kind, its target page type and its entry slug.",
    },
    {
      invariantKind: "departure",
      statement: "A value the property does not carry is held as null rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A qualified name is held as its slug alone, so an answer is a key into the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "An entry is read from the property's own page and from no other, so no other page's change can leave it stale.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A list reaches what its entries may name in one read rather than in one read for each link.",
    },
  ],
} as const satisfies Domain
