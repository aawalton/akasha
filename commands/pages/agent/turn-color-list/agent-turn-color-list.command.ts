import type { Command } from "akasha/commands/command.page-type.types.ts"

export const agentTurnColorList = {
  id: "01a0693c-9b24-7a22-8c27-03b9194b117e",
  type: "command",
  slug: "agent-turn-color-list",
  definition:
    "the command answering the color each named agent, or each named turn state, is drawn in",
  code: "ts",
  test: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The answer is one JSON object carrying a `colors` record keyed by what was asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent reads stopped once it has returned or once its seat has stopped.",
    },
    {
      invariantKind: "departure",
      statement: "Asking by state reads no agent.",
    },
    {
      invariantKind: "departure",
      statement: "Every turn state names a color, a stopped state included.",
    },
    {
      invariantKind: "departure",
      statement: "Agent ids and turn states are never asked for in one call.",
    },
    {
      invariantKind: "departure",
      statement: "An agent no records could be kept for is left out rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A name no turn state has is refused rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A turn state's color is read off that state's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A turn state's page is read again on every call.",
    },
    {
      invariantKind: "departure",
      statement: "A color rewritten under a held-open server is the color the next call answers.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is working or stopped and never anything between.",
    },
    {
      invariantKind: "departure",
      statement: "A seat that kept records before a hook stamped a record reads as idle.",
    },
    {
      invariantKind: "departure",
      statement: "A color is a name a palette reads rather than a shade.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a database.",
    },
    {
      invariantKind: "departure",
      statement: "A run keeps beside each seat the reading of that seat's transcript.",
    },
    {
      invariantKind: "departure",
      statement: "The reader of a state's color is handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A test drives that reader without a checkout.",
    },
    {
      invariantKind: "departure",
      statement: "Neither road takes the root the call carries.",
    },
    {
      invariantKind: "departure",
      statement: "One call reads one checkout.",
    },
  ],
  name: "turn-color-list",
  arguments: [
    { argument: "argument/agent", saidAs: "word", notWith: ["argument/turn-state"] },
    { argument: "argument/turn-state", notWith: ["argument/agent"] },
  ],
} as const satisfies Command
