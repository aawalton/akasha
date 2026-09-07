import type { Command } from "@akasha/command-system/command"

export const temperInventoryParity = {
  id: "01a0603c-c1d6-73fa-8ab1-b6d5deb216e2",
  pageTypeSlug: "command",
  slug: "temper-inventory-parity",
  definition: "the command ruling whether the addon's trace of an item matches a fresh evaluation",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<item-id>", takes: "the item whose stored trace is compared" },
    { said: "--char <id>", takes: "the character the stored trace was captured from" },
    {
      said: "--inventory-path <path>",
      takes: "the saved-variables file the holdings are read from",
    },
    {
      said: "--characters-path <path>",
      takes: "the saved-variables file the characters are read from",
    },
  ],
  helpNotes: [
    "the inputs are compared first and the walks after, so an input difference explains a walk difference.",
    "the character is named rather than worked out, because a trace is captured from one perspective.",
    "a stored trace for another item refuses the call rather than being compared.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The inputs are compared before the walks.",
    },
    {
      invariantKind: "departure",
      statement: "The character the trace was captured from is named on the call.",
    },
    {
      invariantKind: "departure",
      statement: "A stored trace for another item refuses the call.",
    },
  ],
} as const satisfies Command
