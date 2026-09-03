import type { Module } from "@akasha/code-system/module"

export const markdownPropertyAnswerCache = {
  id: "01a06895-1ce2-7000-bed4-eb01480811b2",
  pageTypeSlug: "module",
  slug: "markdown-property-answer-cache",
  definition: "keeping an answer on disk against the inputs it was read from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer kept against inputs that changed is never returned.",
    },
  ],
} as const satisfies Module
