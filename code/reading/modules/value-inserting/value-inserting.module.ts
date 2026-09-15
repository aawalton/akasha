import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const valueInserting = {
  id: "01a07be9-0fe1-71dc-a802-443ecc56fe31",
  type: "module",
  slug: "value-inserting",
  definition: "a value put into the object literal a body declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value goes in first in the literal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value goes into the first literal the body declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body declaring no literal takes no value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rest of the body is left as the body was.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges the value handed in.",
    },
  ],
} as const satisfies Module
