import type { Module } from "../../code-system/module/module.page-type.ts"

export const personaEmailChannels = {
  id: "01a05c0e-3731-7640-833e-754f15f8aa44",
  pageTypeSlug: "module",
  slug: "persona-email-channels",
  definition: "which email address belongs to which persona",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona carrying no address is left out.",
    },
    {
      invariantKind: "departure",
      statement: "An address is lowercased before it becomes a key.",
    },
    {
      invariantKind: "departure",
      statement: "A row the shape refuses is passed over rather than failing the rest.",
    },
  ],
} as const satisfies Module
