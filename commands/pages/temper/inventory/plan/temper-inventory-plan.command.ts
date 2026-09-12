import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperInventoryPlan = {
  id: "01a0603c-c1d6-7f83-b8aa-93c9e3917440",
  type: "command",
  slug: "temper-inventory-plan",
  definition: "the command working out the management plan the addon would carry out",
  code: "ts",
  taking: [
    {
      said: "--characters-path <path>",
      takes: "the saved-variables file the characters are read from",
    },
    {
      said: "--checklist",
      takes: "give the login and venue-stop checklist rather than the plan the addon shows",
    },
  ],
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
      invariantKind: "gap",
      statement: "The holdings are read from a stored snapshot rather than from the workstation.",
    },
  ],
  name: "plan",
  arguments: [{ argument: "argument/json" }, { argument: "argument/inventory-path" }],
} as const satisfies Command
