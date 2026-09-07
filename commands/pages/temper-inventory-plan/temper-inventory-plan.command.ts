import type { Command } from "@akasha/command-system/command"

export const temperInventoryPlan = {
  id: "01a0603c-c1d6-7f83-b8aa-93c9e3917440",
  pageTypeSlug: "command",
  slug: "temper-inventory-plan",
  definition: "the command working out the management plan the addon would carry out",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--inventory-path <path>",
      takes: "the saved-variables file the holdings are read from",
    },
    {
      said: "--characters-path <path>",
      takes: "the saved-variables file the characters are read from",
    },
    { said: "--json", takes: "give the whole plan as JSON rather than as text" },
    {
      said: "--checklist",
      takes: "give the login and venue-stop checklist rather than the plan the addon shows",
    },
  ],
  helpNotes: [
    "the items every rule reaches are worked out first, then the capacity filter, then the plan.",
    "the checklist is two levels deep: which characters to log in and which venues to stop at.",
    "the checklist never names one item, because a stop is what a player acts on.",
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
      invariantKind: "absence",
      statement: "The checklist names no single item.",
    },
    {
      invariantKind: "gap",
      statement: "The holdings are read from a stored snapshot rather than from the workstation.",
    },
  ],
} as const satisfies Command
