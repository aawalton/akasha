import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stateCooldown = {
  id: "01a0725a-758c-7335-9600-2a7c8c1391a4",
  type: "page-type/module",
  slug: "state-cooldown",
  definition: "when a state file is written again and when the writing waits",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change to a file quiet for its cooldown is written at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change arriving sooner waits out the rest of that cooldown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the last change to arrive in a cooldown is written when that cooldown ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line the same as the line already written is not written again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change back to the line already written leaves nothing waiting.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cooldown is counted from the last write of one file alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock or opens a file.",
    },
  ],
} as const satisfies Module
