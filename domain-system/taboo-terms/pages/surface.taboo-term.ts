import type { TabooTerm } from "../taboo-term.page-type.ts"

export const surface = {
  id: "01a0593e-da3f-7c82-a364-c0a83f8171ff",
  pageTypeSlug: "taboo-term",
  slug: "surface",
  pattern: "(?<![-_.])\\bsurface\\b(?![-_:(]|\\.\\w)",
  tabooSenses: [{ sense: "a document that binds its reader", instead: "document" }],
  keptSenses: [
    "the reads a module or an index offers to whatever reaches it",
    "the layered plane a piece of interface is shown on",
  ],
} as const satisfies TabooTerm
