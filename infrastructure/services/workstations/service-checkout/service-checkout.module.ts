import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const serviceCheckout = {
  id: "01a08df8-2f20-7590-8d5b-082a6a92bfc1",
  pageTypeSlug: "module",
  type: "module",
  slug: "service-checkout",
  definition: "the checkout a workstation service's run reads and writes under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The checkout is the one the environment a unit states names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run the environment names no checkout for works under the directory that run started in.",
    },
  ],
} as const satisfies Module
