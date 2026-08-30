import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageTypeProperties = {
  id: "01a053f6-7bab-764e-b69d-af9ebf0f1558",
  pageTypeSlug: "module",
  slug: "page-type-properties",
  definition: "the properties a page type carries, each under the key it is read by",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The properties a page type carries are its own and those of every type above it, the nearest declaration binding.",
    },
    {
      invariantKind: "departure",
      statement:
        "A property is keyed by what its own page states, never by the slug the declaration reaches it with.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration reaching no page property is left out rather than keyed by the name it states, because what a key is cannot be guessed from what reaches it.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here judges what it gathers. Two properties landing on one key are answered as they stand, and refusing that is the check's work.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the corpus. Every page read is one the index named first.",
    },
  ],
} as const satisfies Module
