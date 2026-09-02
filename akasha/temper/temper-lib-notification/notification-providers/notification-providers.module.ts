import type { Module } from "@akasha/code-system/module"

export const notificationProviders = {
  id: "01a0605a-0515-7efc-a180-1aaa98828cd6",
  pageTypeSlug: "module",
  slug: "notification-providers",
  definition: "the game notification providers a caller's rows are handed to the panels through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A provider is a subclass of the game's own notification provider.",
    },
    {
      invariantKind: "departure",
      statement: "A new provider adds itself to the panel's own list of providers.",
    },
    {
      invariantKind: "departure",
      statement: "Building the list copies the link table deeply.",
    },
    {
      invariantKind: "departure",
      statement: "Accepting or declining calls back to the row rather than to the panel.",
    },
    {
      invariantKind: "stopgap",
      statement: "A misspelled decline callback is read as well as the correctly spelled name.",
    },
  ],
} as const satisfies Module
