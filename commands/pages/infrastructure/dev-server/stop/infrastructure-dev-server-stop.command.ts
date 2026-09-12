import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerStop = {
  id: "01a09403-77db-71fe-ae2b-f3271d914449",
  type: "command",
  slug: "infrastructure-dev-server-stop",
  definition: "the command ending one app's dev server and taking the state file it held",
  code: "ts",
  name: "stop",
  taking: [
    { said: "<seq>", takes: "the branch sequence number, said here where no flag names it" },
    {
      said: "--seq <n>",
      takes: "the branch sequence number naming the worktree, the state file and the log",
    },
    {
      said: "--app <name>",
      takes: "which app to stop, named by the slug that app's web app page carries",
    },
    { said: "--all", takes: "every server a state file tracks, in place of naming one" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word is read only where no flag names a seq.",
    },
    {
      invariantKind: "departure",
      statement: "This names one server or every server tracked.",
    },
    {
      invariantKind: "departure",
      statement: "Naming one server and every server tracked at once is refused.",
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
  ],
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
