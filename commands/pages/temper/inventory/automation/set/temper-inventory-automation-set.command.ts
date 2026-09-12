import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryAutomationSet = {
  id: "01a0603c-c1ce-7042-a37c-880bfd4380f9",
  type: "command",
  slug: "temper-inventory-automation-set",
  definition: "the command setting or clearing one automation toggle",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One call sets one toggle.",
    },
    {
      invariantKind: "departure",
      statement: "The act that sets takes the settings it writes through rather than reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "The scope, the toggle and the value are read before the settings are.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says the settings would not take the change and no more than that.",
    },
    {
      invariantKind: "departure",
      statement: "A null value takes the entry away.",
    },
    {
      invariantKind: "departure",
      statement: "A global toggle carried by both interfaces needs a target.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle no interface carries refuses the call.",
    },
  ],
  name: "set",
  arguments: [
    { argument: "argument/scope", required: true },
    { argument: "argument/toggle", required: true },
    { argument: "argument/value", required: true },
    { argument: "argument/toggle-target" },
  ],
} as const satisfies Command
