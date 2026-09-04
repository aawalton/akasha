import type { Module } from "@akasha/code-system/module"

export const logBoundSaying = {
  id: "01a06583-0030-7002-a537-54289a8c69bf",
  pageTypeSlug: "module",
  slug: "log-bound-saying",
  definition: "what bounded a log result, said in a line and named as a kind",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A result bounded by anything says so rather than reading as the whole log.",
    },
    {
      invariantKind: "departure",
      statement: "An empty result says that finding nothing is no evidence of absence.",
    },
    {
      invariantKind: "departure",
      statement: "A bound that could not be determined is said as undetermined.",
    },
    {
      invariantKind: "departure",
      statement: "An empty result naming a pod other namespaces hold says those namespaces.",
    },
    {
      invariantKind: "departure",
      statement: "The limit is said before the window.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches a log line.",
    },
  ],
} as const satisfies Module
