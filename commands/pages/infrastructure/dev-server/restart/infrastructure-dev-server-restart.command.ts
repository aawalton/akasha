import type { Command } from "akasha/commands/command.page-type.types.ts"

export const infrastructureDevServerRestart = {
  id: "01a09403-c58e-76ba-82dc-317be1c2700b",
  type: "command",
  slug: "infrastructure-dev-server-restart",
  definition: "the command stopping one app's dev server and starting it again",
  code: "ts",
  name: "restart",
  taking: [
    {
      said: "--app <name>",
      takes: "which app to restart, named by the slug that app's web app page carries",
    },
    {
      said: "--port <p>",
      takes: "the port to run on, replacing the one the base port and the seq work out",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seq said as a word is read only where no flag names a seq.",
    },
    {
      invariantKind: "departure",
      statement: "This answers with the answer its start gave and nothing of its stop.",
    },
    {
      invariantKind: "departure",
      statement: "A stop that refused leaves the start unrun.",
    },
  ],
  arguments: [{ argument: "argument/json" }, { argument: "argument/seq", saidAs: "flag-or-word" }],
} as const satisfies Command
