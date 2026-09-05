import type { Module } from "@akasha/code-system/module"

export const exerciseDigest = {
  id: "01a069c2-f7f8-72a4-b020-a31cddca2979",
  pageTypeSlug: "module",
  slug: "exercise-digest",
  definition: "the coaching digest for one focus, printed as one block before a session",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ops dispatcher imports this module and calls the default export it declares.",
    },
    {
      invariantKind: "departure",
      statement: "A focus nobody gives is the focus today's schedule names.",
    },
    {
      invariantKind: "departure",
      statement: "A focus outside the vocabulary is refused before any page is read.",
    },
    {
      invariantKind: "departure",
      statement: "The digest is composed elsewhere and only rendered here.",
    },
  ],
} as const satisfies Module
