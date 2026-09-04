import type { Module } from "@akasha/code-system/module"

export const claudeAccountAliasSnapshot = {
  id: "01a069ff-cfa6-7639-8b2a-82659221cf54",
  pageTypeSlug: "module",
  slug: "claude-account-alias-snapshot",
  definition: "the local file naming which shell alias each claude account answers to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The snapshot is written whole rather than edited in place.",
    },
    {
      invariantKind: "departure",
      statement: "Entries are in alias index order.",
    },
    {
      invariantKind: "departure",
      statement: "The snapshot path is a default a caller replaces.",
    },
  ],
} as const satisfies Module
