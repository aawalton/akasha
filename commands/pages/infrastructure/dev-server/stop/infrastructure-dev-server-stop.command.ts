import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerStop = {
  id: "01a09403-77db-71fe-ae2b-f3271d914449",
  type: "command",
  slug: "infrastructure-dev-server-stop",
  definition: "the command ending one app's dev server and taking the state file it held",
  code: "ts",
  name: "stop",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word and after `--seq` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "This names one server or every server tracked.",
    },
    {
      invariantKind: "departure",
      statement: "SIGTERM is sent first.",
    },
    {
      invariantKind: "departure",
      statement: "The wait for the process to go follows.",
    },
    {
      invariantKind: "departure",
      statement: "SIGKILL is sent to a process the wait did not outlast.",
    },
    {
      invariantKind: "departure",
      statement:
        "A server already stopped is answered as stopped and the state file it left is taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stop that stopped part way names each server signalled and each state file taken.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that signalled nothing is refused as the fault alone.",
    },
  ],
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/seq", saidAs: "flag-or-word" },
    { argument: "argument/web-app" },
    {
      argument: "argument/every-server",
      notWith: ["argument/seq", "argument/web-app"],
    },
  ],
} as const satisfies Command
