import type { Module } from "@akasha/code-system/module"

export const seatReset = {
  id: "01a069cb-0380-715a-9d83-e8177fb074e2",
  pageTypeSlug: "module",
  slug: "seat-reset",
  definition: "a new agent sat down in a named seat, holding every declaration the seat states",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ops dispatcher imports this and calls the default export it declares.",
    },
    {
      invariantKind: "departure",
      statement: "A seat resetting itself is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A reset ends the turn that asked for the reset.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the seat states is read back from its last committed page where no page is live.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat whose declarations spell no name is refused rather than reset into nothing.",
    },
  ],
} as const satisfies Module
