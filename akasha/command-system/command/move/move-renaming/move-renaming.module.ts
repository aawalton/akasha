import type { Module } from "../../../../code-system/module/module.page-type.ts"

export const moveRenaming = {
  id: "01a0580e-88ca-790a-846a-3b4f471ec14f",
  pageTypeSlug: "module",
  slug: "move-renaming",
  definition: "a page's slug restated in its own body and in the pages addressing it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rename restates the slug the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A rename renames the value the page is bound to.",
    },
    {
      invariantKind: "departure",
      statement: "A file standing beside a renamed page is renamed with it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's slug is not renamed here.",
    },
    {
      invariantKind: "departure",
      statement: "A name whose tail changes is no rename.",
    },
    {
      invariantKind: "departure",
      statement: "The pages addressing a rename are read from the index as it stands before it.",
    },
    {
      invariantKind: "departure",
      statement: "How a page spells an address is read from that page's own value.",
    },
    {
      invariantKind: "departure",
      statement: "An address is rewritten in the form it was written in.",
    },
    {
      invariantKind: "absence",
      statement: "An address spelled as an id is left as it stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether an edge is left naming nobody.",
    },
  ],
} as const satisfies Module
