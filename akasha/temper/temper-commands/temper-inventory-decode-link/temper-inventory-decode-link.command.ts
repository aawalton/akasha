import type { Command } from "@akasha/command-system/command"

export const temperInventoryDecodeLink = {
  id: "01a0603c-c1d2-7be2-8f61-08de3fd69b48",
  pageTypeSlug: "command",
  slug: "temper-inventory-decode-link",
  definition: "the command reading a game item link into its named fields",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<link>", takes: "the game item link read" },
    { said: "--json", takes: "give the fields as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "a link carries twenty-one fields after its item marker, and one carrying fewer is refused rather than read partway.",
    "the fields after the twenty-first are the game's to add, so a longer link is read rather than refused.",
    "a link naming no item marker is refused, since the marker is what says where the fields begin.",
    "nothing is read off the workstation here: the link is the whole input.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A link carries twenty-one fields after its item marker.",
    },
    {
      invariantKind: "departure",
      statement: "A link carrying fewer refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A link carrying more is read rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A link naming no item marker refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "The fields are named beside their values.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Command
