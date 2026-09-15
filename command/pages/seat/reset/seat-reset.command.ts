import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatReset = {
  id: "01a0797a-9aa4-7473-88de-e9a24a94bb70",
  type: "page-type/command",
  slug: "seat-reset",
  definition: "the command sitting a new agent down under everything a seat already states",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset reads the last committed page where the seat is stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat reset is named by the first word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat to reset is named as that seat's page is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word past the seat's name is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code a reset runs is reached only once a reset is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The output a reset prints is written where the reset runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reset refused after it took the agent out of the seat names each write it finished.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reset refused before it wrote anything is refused as the fault alone.",
    },
  ],
  name: "reset",
  arguments: [{ argument: "argument/seat", required: true, saidAs: "word" }],
} as const satisfies Command
