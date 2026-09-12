import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryPlan = {
  id: "01a0603c-c1d6-7f83-b8aa-93c9e3917440",
  type: "command",
  slug: "temper-inventory-plan",
  definition: "the command working out the management plan the addon would carry out",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The items every rule reaches are worked out before the capacity filter.",
    },
    {
      invariantKind: "departure",
      statement: "The capacity filter runs before the plan is built.",
    },
    {
      invariantKind: "departure",
      statement: "The checklist names character logins and venue stops.",
    },
    {
      invariantKind: "departure",
      statement: "A checklist's venue stops sit under the character login they belong to.",
    },
    {
      invariantKind: "absence",
      statement: "The checklist names no single item.",
    },
    {
      invariantKind: "departure",
      statement:
        "The unmapped report names the items reaching the end of the rules with no rule acting on them.",
    },
    {
      invariantKind: "departure",
      statement: "The rules end in every trailing rule reaching every item and acting on none.",
    },
    {
      invariantKind: "departure",
      statement: "A rule the matcher ends with and one Alan ends with end the rules alike.",
    },
    {
      invariantKind: "absence",
      statement: "No rule a condition narrows ends the rules, whatever that rule's action.",
    },
    {
      invariantKind: "departure",
      statement: "The unmapped report gathers items by the item they are rather than by the stack.",
    },
    {
      invariantKind: "departure",
      statement: "The unmapped report is what JSON answers where JSON is asked for beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run finding no unmapped item says every item the holdings hold is reached by a rule.",
    },
    {
      invariantKind: "gap",
      statement: "An item a rule could not decide is told apart from an item no rule reaches.",
    },
    {
      invariantKind: "gap",
      statement: "The holdings are read from a stored snapshot rather than from the workstation.",
    },
  ],
  name: "plan",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/inventory-path" },
    { argument: "argument/characters-path" },
    { argument: "argument/login-checklist" },
    { argument: "argument/unmapped" },
  ],
} as const satisfies Command
