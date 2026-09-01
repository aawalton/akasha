import type { TabooTerm } from "../taboo-term.page-type.ts"

export const schema = {
  id: "01a0593e-da3b-78e0-ac32-b8866f1f8ed9",
  pageTypeSlug: "taboo-term",
  slug: "schema",
  pattern: '(?<![-.])\\bschema\\b(?![-/"])',
  tabooSenses: [
    {
      sense: "the specification a document was written to",
      instead: "a page type and the body shape it names",
    },
  ],
  keptSenses: ["the shape a zod validator names a value must have"],
} as const satisfies TabooTerm
