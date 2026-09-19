import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureDevServerRestart = {
  id: "01a09403-c58e-76ba-82dc-317be1c2700b",
  type: "page-type/command",
  slug: "infrastructure-dev-server-restart",
  definition: "the command stopping one app's dev server and starting it again",
  code: "ts",
  test: "ts",
  name: "restart",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit said as a word and after `--commit` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This answers with the answer its start gave where that start gave no refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop that refused leaves the start unrun.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start that refused names the server the stop ended beside that refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart that stopped part way names each server it ended and each it started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restart that ended nothing is refused as the fault alone.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/commit", required: true, saidAs: "flag-or-word" },
    { argument: "argument/web-app", required: true },
    { argument: "argument/port" },
  ],
} as const satisfies Command
