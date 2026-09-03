import type { Module } from "@akasha/code-system/module"

export const ciReapDecision = {
  id: "01a06861-24c9-7012-ac9e-b711d862fe72",
  pageTypeSlug: "module",
  slug: "ci-reap-decision",
  definition: "whether a container standing in the ci namespace is cleared off it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A container whose step has reached a verdict is cleared.",
    },
    {
      invariantKind: "departure",
      statement:
        "A container no step names is cleared only where its pipeline has reached a verdict.",
    },
    {
      invariantKind: "departure",
      statement:
        "A container whose name carries no pipeline sequence was launched elsewhere and is left alone.",
    },
  ],
} as const satisfies Module
