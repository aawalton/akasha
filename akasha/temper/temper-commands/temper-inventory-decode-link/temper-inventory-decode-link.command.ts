import type { Command } from "@akasha/command-system/command"

export const temperInventoryDecodeLink = {
  id: "01a0603c-c1d2-7be2-8f61-08de3fd69b48",
  pageTypeSlug: "command",
  slug: "temper-inventory-decode-link",
  definition: "the command reading a game item link into its named fields",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<link>", takes: "the game item link read" },
    { said: "--json", takes: "give the fields as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "a link carries twenty fields, and one carrying another count is refused rather than read partway.",
    "nothing is read off the workstation here: the link is the whole input.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A link carries twenty fields.",
    },
    {
      invariantKind: "departure",
      statement: "A link carrying another count refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Command
