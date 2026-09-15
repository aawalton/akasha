import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatReset = {
  id: "01a0797a-9aa4-7473-88de-e9a24a94bb70",
  type: "command",
  slug: "seat-reset",
  definition: "the command sitting a new agent down under everything a seat already states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset reads the last committed page where the seat is stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat reset is named by the first word.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat to reset is named as that seat's page is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word past the seat's name is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The code a reset runs is reached only once a reset is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The output a reset prints is written where the reset runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reset refused after it took the agent out of the seat names each write it finished.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reset refused before it wrote anything is refused as the fault alone.",
    },
  ],
  name: "reset",
  arguments: [{ argument: "argument/seat", required: true, saidAs: "word" }],
} as const satisfies Command
