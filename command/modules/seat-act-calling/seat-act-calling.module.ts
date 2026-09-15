import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatActCalling = {
  id: "01a0797a-9a3b-7327-8ca0-65c7360e1566",
  type: "module",
  slug: "seat-act-calling",
  definition: "a seat act run with what it finished writing named where the act is refused",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal from a wrapped act has the exit code that act's error states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wrapped act is handed a list to name each thing that act finishes writing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An act that threw after writing is refused naming what the act had written by then.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act that threw before writing anything is refused as the fault alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault says where that fault was thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An act that finished every write says nothing over what that act printed itself.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a seat's page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which acts a seat takes.",
    },
  ],
} as const satisfies Module
