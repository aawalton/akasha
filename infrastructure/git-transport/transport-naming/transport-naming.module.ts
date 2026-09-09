import type { Module } from "@akasha/code/module"

export const transportNaming = {
  id: "01a06816-2f11-7561-81cd-c9dd76b64b8a",
  pageTypeSlug: "module",
  type: "module",
  slug: "transport-naming",
  definition: "the names and labels every resource of this workload carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name is spelled here once and every resource takes the name from here.",
    },
    {
      invariantKind: "departure",
      statement: "A pod carries labels beyond the labels that pod is selected by.",
    },
  ],
} as const satisfies Module
