import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperInventoryAutomationSet = {
  id: "01a0603c-c1ce-7042-a37c-880bfd4380f9",
  type: "page-type/command",
  slug: "temper-inventory-automation-set",
  definition: "the command setting or clearing an automation toggle",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One call sets one toggle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The act that sets takes the settings it writes through rather than reaching it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scope, the toggle and the value are read before the settings are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says the settings would not take the change and no more than that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A null value takes the entry away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global toggle carried by both interfaces needs a target.",
    },
    {
      decisionKind: "decision-kind/departure",
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
