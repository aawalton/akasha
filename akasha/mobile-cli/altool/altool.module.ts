import type { Module } from "@akasha/code-system/module"

export const altool = {
  id: "01a05cee-e560-762e-9911-22cd2e9873c6",
  pageTypeSlug: "module",
  slug: "altool",
  definition: "the named failure classes read out of xcrun altool's validate and upload output",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "a non-zero altool exit carrying no parseable verdict leaves the build unvalidated rather than valid",
    },
    {
      invariantKind: "constraint",
      statement: "Exit code 4 represents a validation that never completed",
    },
    {
      invariantKind: "constraint",
      statement: "Apple error 90683 is the missing NSHealthUpdateUsageDescription rejection",
    },
    {
      invariantKind: "constraint",
      statement:
        "Apple keys the HealthKit purpose string on the entitlement rather than on the APIs the code calls",
    },
    {
      invariantKind: "departure",
      statement:
        "a step counts as failed when its begin marker appears in the output without its ok marker",
    },
  ],
} as const satisfies Module
