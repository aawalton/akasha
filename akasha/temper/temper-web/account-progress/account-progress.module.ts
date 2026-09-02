import type { Module } from "@akasha/code-system/module"

export const accountProgress = {
  id: "01a06421-f74b-7ac7-a2c3-4120a9e80006",
  pageTypeSlug: "module",
  slug: "account-progress",
  definition: "the account-wide progress worked out from the catalogs and the saved data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The zone completion union reads the per-character progress alone and takes no catalog.",
    },
  ],
} as const satisfies Module
