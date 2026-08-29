import type { Module } from "../../code-system/module/module.page-type.ts"

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
        "A page of every page type standing under `domain` is drawn, not only a page whose own type is `domain`.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page types stand under `domain` is worked out from the page type pages themselves, so a page type added later is drawn without this being touched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is answered under its address rather than its slug, because two page types may each hold a page of one slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "The index files a part edge under the part, so a page's own parent is found by listing what names it.",
    },
    {
      invariantKind: "departure",
      statement: "A page standing under other than one parent is answered as under none.",
    },
    {
      invariantKind: "departure",
      statement:
        "An order is read out of the page, because the index files an edge without the place it was stated in.",
    },
    {
      invariantKind: "departure",
      statement: "Only a page the index says holds parts is opened for its order.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the corpus. Every page answered is one the index named first.",
    },
  ],
} as const satisfies Module
