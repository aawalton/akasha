import type { Command } from "akasha/command/command.page-type.types.ts"

export const infrastructureDevServerStop = {
  id: "01a09403-77db-71fe-ae2b-f3271d914449",
  type: "page-type/command",
  slug: "infrastructure-dev-server-stop",
  definition: "the command ending one app's dev server and taking the state file it held",
  code: "ts",
  test: "ts",
  name: "stop",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit said as a word and after `--commit` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This names one server or every server tracked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "SIGTERM is sent first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait for the process to go follows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "SIGKILL is sent to a process the wait did not outlast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A server already stopped is answered as stopped and the state file it left is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stop that stopped part way names each server signalled and each state file taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop that signalled nothing is refused as the fault alone.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/commit", saidAs: "flag-or-word" },
    { argument: "argument/web-app" },
    {
      argument: "argument/every-server",
      notWith: ["argument/commit", "argument/web-app"],
    },
  ],
} as const satisfies Command
