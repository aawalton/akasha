import type { Module } from "@akasha/code-system/module"

export const transportNaming = {
  id: "01a06816-2f11-7561-81cd-c9dd76b64b8a",
  pageTypeSlug: "module",
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
      statement: "What a pod is selected by is fewer labels than what a pod carries.",
    },
  ],
} as const satisfies Module
