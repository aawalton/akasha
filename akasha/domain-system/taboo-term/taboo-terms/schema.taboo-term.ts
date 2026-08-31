import type { TabooTerm } from "../taboo-term.page-type.ts"

export const schema = {
  id: "01a0593e-da3b-78e0-ac32-b8866f1f8ed9",
  pageTypeSlug: "taboo-term",
  slug: "schema",
  tabooSenses: [
    {
      sense: "the specification a document was written to",
      instead: "a page type and the body shape it names",
    },
  ],
} as const satisfies TabooTerm
