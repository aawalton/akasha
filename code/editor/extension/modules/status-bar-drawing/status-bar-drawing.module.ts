import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarDrawing = {
  id: "01a06816-69fa-7000-b090-e3d420f7dce0",
  type: "module",
  slug: "status-bar-drawing",
  definition: "what each slot says once a reading has settled or gone stale",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading that answered is fresh at the moment that reading answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading that failed is stale and keeps the moment that reading was last fresh.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stale slot keeps the text that slot last had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stale slot says in its tooltip how long that slot has been stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stale slot that was never fresh says so rather than naming a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A separator slot is never written to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The slots are drawn from the slot list rather than from the readings that answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty tooltip is left unset rather than drawn blank.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads anything.",
    },
  ],
} as const satisfies Module
