import type { Module } from "@akasha/code-system/module"

export const markdownPageAt = {
  id: "01a05cc6-2a1c-738e-8e0d-5b9d45886508",
  pageTypeSlug: "module",
  slug: "markdown-page-at",
  definition: "which repository a markdown page stands in and where it stands inside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is said as its repository and its key parted by a colon.",
    },
    {
      invariantKind: "departure",
      statement:
        "A set of roots may name a repository the set of roots stands under as its target.",
    },
  ],
} as const satisfies Module
