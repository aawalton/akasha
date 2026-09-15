import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seededDraw = {
  id: "01a077e7-e766-7e74-bb8e-f95b949f5b32",
  type: "page-type/module",
  slug: "seeded-draw",
  definition: "items drawn without replacement from a source of draws a seed makes repeatable",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One seed gives one run of draws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A draw is a whole number from nought up to but not including the bound asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run is arithmetic on the seed rather than the machine's own entropy.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bound that is no positive whole number is refused rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two seeds that differ give runs that differ.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A draw asking for more items than there are gives every item there is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The source of randomness is handed in rather than reached for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index the randomness returns from outside its bound is refused.",
    },
  ],
} as const satisfies Module
