import type { Module } from "@akasha/code/module"

export const seatActCalling = {
  id: "01a0797a-9a3b-7327-8ca0-65c7360e1566",
  pageTypeSlug: "module",
  slug: "seat-act-calling",
  definition: "a seat act called with the words that follow the act's name",
  code: "ts",
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
      invariantKind: "absence",
      statement: "Nothing here reads a seat's page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which acts a seat takes.",
    },
  ],
} as const satisfies Module
