import type { Command } from "akasha/commands/command.page-type.types.ts"

export const seatReset = {
  id: "01a0797a-9aa4-7473-88de-e9a24a94bb70",
  type: "command",
  slug: "seat-reset",
  definition: "the command sitting a new agent down under everything a seat already states",
  code: "ts",
  test: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reset reads the last committed page where the seat is stopped.",
    },
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
    {
      invariantKind: "departure",
      statement:
        "A reset refused after it took the agent out of the seat names each write it finished.",
    },
    {
      invariantKind: "departure",
      statement: "A reset refused before it wrote anything is refused as the fault alone.",
    },
  ],
  name: "reset",
  arguments: [{ argument: "argument/seat", required: true, saidAs: "word" }],
} as const satisfies Command
