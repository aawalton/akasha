import type { Command } from "@akasha/command-system/command"

export const temperInventoryCapacityAudit = {
  id: "01a0603c-c1d1-78cf-9174-01514c3d023a",
  pageTypeSlug: "command",
  slug: "temper-inventory-capacity-audit",
  definition: "the command naming the destinations whose storage the rules would overflow",
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
    { said: "--json", takes: "give the whole audit as JSON rather than as text" },
  ],
  helpNotes: [
    "each overflowing destination carries the slots needed against the slots free.",
    "the rules and the items the capacity filter dropped are named beside it.",
    "a run finding no overflow reports nothing.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A destination is reported only where the slots needed run past the slots free.",
    },
    {
      invariantKind: "departure",
      statement: "An overflowing destination names what the capacity filter dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A run finding no overflow reports nothing.",
    },
  ],
} as const satisfies Command
