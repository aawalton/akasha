import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const indexRelation = {
  id: "01a04a4a-23e9-77f1-b8ce-68661b5a2925",
  pageTypeSlug: "domain",
  slug: "index-relation",
  definition: "an index from a page to the pages naming it",
  design: [
    {
      invariantKind: "departure",
      statement: "An edge file is found by target id, then source property, then source page id.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is filed under the target's id, whichever identifier the source wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf is named for the source's id.",
    },
    {
      invariantKind: "departure",
      statement: "One write creates and removes only files it alone owns.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relation free to name more than one page type carries the page type in its value.",
    },
  ],
} as const satisfies Domain
