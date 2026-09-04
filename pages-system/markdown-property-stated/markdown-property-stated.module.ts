import type { Module } from "@akasha/code-system/module"

export const markdownPropertyStated = {
  id: "01a06746-c09f-7119-b5c6-99b48960a5fa",
  pageTypeSlug: "module",
  slug: "markdown-property-stated",
  definition: "what a page type states about one markdown property's values",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value a property holds is text at every leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A list or a map of values is itself a value.",
    },
    {
      invariantKind: "departure",
      statement: "What a page type states about a property's values is carried as written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here parses or judges anything.",
    },
  ],
} as const satisfies Module
