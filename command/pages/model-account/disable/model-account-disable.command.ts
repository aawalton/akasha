import type { Command } from "akasha/command/command.page-type.types.ts"

export const modelAccountDisable = {
  id: "01a0c917-8c51-734d-8525-b3969f3a25df",
  type: "page-type/command",
  slug: "model-account-disable",
  definition: "the command shutting a model account out of the pool its subscription left",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The picker passes the account over from the next ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Upkeep passes the account over, and the stall ruling counts it withdrawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One call names one account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account no page is filed for is refused rather than made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reason is written beside the page rather than in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reason is the one this command words, a caller wording none of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account already shut out is answered as already shut out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account no page is filed for is a fault of the data.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a token or asks a model.",
    },
  ],
  name: "disable",
  arguments: [{ argument: "argument/account", required: true, saidAs: "word" }],
} as const satisfies Command
