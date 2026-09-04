import type { Module } from "../../code-system/modules/module.page-type.ts"

export const panelDomains = {
  id: "01a04e9f-4572-74d2-b19a-9fd2f81583eb",
  pageTypeSlug: "module",
  slug: "panel-domains",
  definition: "every domain the domains panel draws, the one each stands under, and their order",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page of every page type sitting under `domain` is drawn rather than a `domain` page alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page types stand under `domain` is worked out from the page type pages themselves.",
    },
    {
      invariantKind: "departure",
      statement: "A page is answered under its address rather than its slug.",
    },
    {
      invariantKind: "departure",
      statement: "Two page types may each hold a page of one slug.",
    },
    {
      invariantKind: "departure",
      statement: "The index files a part edge under the part.",
    },
    {
      invariantKind: "departure",
      statement: "A page standing under other than one parent is answered as under none.",
    },
    {
      invariantKind: "departure",
      statement: "An order is read out of the page.",
    },
    {
      invariantKind: "departure",
      statement: "The index files an edge without the place the edge was stated in.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page the index says holds parts is opened for its order.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the pages.",
    },
    {
      invariantKind: "absence",
      statement: "Every page answered is a page the index named first.",
    },
  ],
} as const satisfies Module
