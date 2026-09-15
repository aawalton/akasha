import type { Command } from "akasha/command/command.page-type.types.ts"

export const agentTurnColorList = {
  id: "01a0693c-9b24-7a22-8c27-03b9194b117e",
  type: "command",
  slug: "agent-turn-color-list",
  definition:
    "the command answering the color each named agent, or each named turn state, is drawn in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The answer is one JSON object carrying a `colors` record keyed by what was asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent reads stopped once it has returned or once its seat has stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Asking by state reads no agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every turn state names a color, a stopped state included.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Agent ids and turn states are never asked for in one call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent no records could be kept for is left out rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name no turn state has is refused rather than left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A turn state's color is read off that state's own page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A turn state's page is read again on every call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color rewritten under a held-open server is the color the next call answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent is working or stopped and never anything between.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat that kept records before a hook stamped a record reads as idle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color is a name a palette reads rather than a shade.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a database.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run keeps beside each seat the reading of that seat's transcript.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reader of a state's color is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test drives that reader without a checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Neither road takes the root the call carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call reads one checkout.",
    },
  ],
  name: "turn-color-list",
  arguments: [
    { argument: "argument/agent", repeats: true, saidAs: "word", notWith: ["argument/turn-state"] },
    { argument: "argument/turn-state", repeats: true, notWith: ["argument/agent"] },
  ],
} as const satisfies Command
