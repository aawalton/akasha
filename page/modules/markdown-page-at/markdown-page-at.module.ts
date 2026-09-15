import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markdownPageAt = {
  id: "01a05cc6-2a1c-738e-8e0d-5b9d45886508",
  type: "module",
  slug: "markdown-page-at",
  definition: "which repository a markdown page is in and where it is inside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set of roots may name a repository the set of roots is under as its target.",
    },
  ],
} as const satisfies Module
