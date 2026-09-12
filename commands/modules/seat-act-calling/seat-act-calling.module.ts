import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatActCalling = {
  id: "01a0797a-9a3b-7327-8ca0-65c7360e1566",
  type: "module",
  slug: "seat-act-calling",
  definition: "a seat act called with the words that follow the act's name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat an act acts on is named by the first word past the act's name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag standing where the seat should be named is refused rather than read as a name.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming no seat at all is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from a wrapped act has the exit code that act's error states.",
    },
    {
      invariantKind: "departure",
      statement: "A wrapped act is handed a list to name each thing that act finishes writing.",
    },
    {
      invariantKind: "departure",
      statement:
        "An act that threw after writing is refused naming what the act had written by then.",
    },
    {
      invariantKind: "departure",
      statement: "An act that threw before writing anything is refused as the fault alone.",
    },
    {
      invariantKind: "departure",
      statement: "An act that finished every write says nothing over what that act printed itself.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a seat's page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which acts a seat takes.",
    },
  ],
} as const satisfies Module
