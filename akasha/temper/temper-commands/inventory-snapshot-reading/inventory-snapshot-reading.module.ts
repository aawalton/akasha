import type { Module } from "@akasha/code-system/module"

export const inventorySnapshotReading = {
  id: "01a068e2-226c-7031-8b22-521c27850f03",
  pageTypeSlug: "module",
  slug: "inventory-snapshot-reading",
  definition: "a reading of a player's inventory, found by its page and read from its data file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The latest reading for an account is the one captured last.",
    },
    {
      invariantKind: "departure",
      statement: "The chunk pages record how the transport divided a reading and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes are read from the snapshot's own data file, already rejoined.",
    },
    {
      invariantKind: "departure",
      statement: "A reading nothing carries answers as nothing rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A page type that goes unread is refused by name.",
    },
  ],
} as const satisfies Module
