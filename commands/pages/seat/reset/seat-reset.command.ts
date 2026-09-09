import type { Command } from "../../../command.page-type.ts"

export const seatReset = {
  id: "01a0797a-9aa4-7473-88de-e9a24a94bb70",
  pageTypeSlug: "command",
  slug: "seat-reset",
  definition: "the command sitting a new agent down under everything a seat already states",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [{ said: "<name>", takes: "the seat to reset, named as that seat's page is named" }],
  helpNotes: [
    "a reset names one seat, spelled as that seat's page is spelled rather than as an id.",
    "a reset reads the last committed page where the seat is stopped, and that page is reached by the name.",
    "what a reset says is written where the reset runs rather than carried back as a report.",
    "a flag past the name is refused though the module beneath a reset takes several.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The seat reset is named by the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A seat to reset is named as that seat's page is named.",
    },
    {
      invariantKind: "departure",
      statement: "A word past the seat's name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The code a reset runs is reached only once a reset is read.",
    },
    {
      invariantKind: "departure",
      statement: "The output a reset prints is written where the reset runs.",
    },
  ],
} as const satisfies Command
