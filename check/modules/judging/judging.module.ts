import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const judging = {
  id: "01a04bc4-7e86-7fa6-8d9b-5532730b7daf",
  type: "module",
  slug: "judging",
  definition: "the refusals a check answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing here imports a check or a command.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check is handed a change and the shadow that change reads through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit is handed the root alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "There is no change at audit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The two answer the same refusals.",
    },
  ],
} as const satisfies Module
