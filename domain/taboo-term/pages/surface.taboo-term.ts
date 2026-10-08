import type { TabooTerm } from "akasha/domain/taboo-term/taboo-term.page-type.types.ts"

export const surface = {
  id: "01a0593e-da3f-7c82-a364-c0a83f8171ff",
  type: "page-type/taboo-term",
  slug: "surface",
  pattern: "(?<![-_.])\\bsurface\\b(?![-_:(]|\\.\\w)",
  tabooSenses: [{ sense: "a document that binds its reader", instead: "document" }],
  keptSenses: [
    "the reads a module or an index offers to whatever reaches it",
    "the layered plane a piece of interface is shown on",
  ],
  createdAt: "2026-08-31T19:14:46.463Z",
  updatedAt: "2026-09-15T17:45:26.000Z",
} as const satisfies TabooTerm
