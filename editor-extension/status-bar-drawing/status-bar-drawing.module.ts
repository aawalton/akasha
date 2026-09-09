import type { Module } from "../../code-system/modules/module.page-type.ts"

export const statusBarDrawing = {
  id: "01a06816-69fa-7000-b090-e3d420f7dce0",
  pageTypeSlug: "module",
  type: "module",
  slug: "status-bar-drawing",
  definition: "what each slot says once a reading has settled or gone stale",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading that answered is fresh at the moment that reading answered.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that failed is stale and keeps the moment that reading was last fresh.",
    },
    {
      invariantKind: "departure",
      statement: "A stale slot keeps the text that slot last had.",
    },
    {
      invariantKind: "departure",
      statement: "A stale slot says in its tooltip how long that slot has been stale.",
    },
    {
      invariantKind: "departure",
      statement: "A stale slot that was never fresh says so rather than naming a time.",
    },
    {
      invariantKind: "departure",
      statement: "A separator slot is never written to.",
    },
    {
      invariantKind: "departure",
      statement:
        "The slots are drawn from the slot list rather than from the readings that answered.",
    },
    {
      invariantKind: "departure",
      statement: "An empty tooltip is left unset rather than drawn blank.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads anything.",
    },
  ],
} as const satisfies Module
