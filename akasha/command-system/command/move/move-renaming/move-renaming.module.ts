import type { Module } from "@akasha/code-system/module"

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
      statement: "A file standing beside a renamed page is renamed with that page.",
    },
    {
      invariantKind: "departure",
      statement: "A value named for the old slug in a file beside a renamed page is renamed too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A runner taking the export a page's slug names finds that export under the new name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a body spells as text rather than as an identifier is left as that name stands.",
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
      statement:
        "The pages addressing a rename are read from the index as the index stands before the rename.",
    },
    {
      invariantKind: "departure",
      statement: "How a page spells an address is read from that page's own value.",
    },
    {
      invariantKind: "departure",
      statement: "An address is rewritten in the form the address was written in.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the old slug is still spelled after a rename is answered rather than changed.",
    },
    {
      invariantKind: "departure",
      statement: "A path spelling the old slug is answered beside the bodies spelling that slug.",
    },
    {
      invariantKind: "departure",
      statement: "A move renaming no slug is answered with no spelling.",
    },
    {
      invariantKind: "absence",
      statement: "An address spelled as an id is left as that address stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether an edge is left naming nobody.",
    },
  ],
} as const satisfies Module
