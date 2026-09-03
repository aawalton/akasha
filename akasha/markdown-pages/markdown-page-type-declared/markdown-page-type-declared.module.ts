import type { Module } from "@akasha/code-system/module"

export const markdownPageTypeDeclared = {
  id: "01a068a4-60f0-7004-93fd-91af61b076ba",
  pageTypeSlug: "module",
  slug: "markdown-page-type-declared",
  definition: "the properties a page type declares, compiled once per tree and held",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type the registry does not name declares nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type declaring an empty list declares nothing, so an empty answer and no answer are one.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is compiled once per tree and the answer is held against that tree.",
    },
  ],
} as const satisfies Module
