import type { Module } from "@akasha/code-system/module"

export const watcherImportCharacters = {
  id: "01a06381-35cf-7a07-8865-e71df4fc233b",
  pageTypeSlug: "module",
  slug: "watcher-import-characters",
  definition:
    "the characters a saved-variables file holds, re-encoded onto account character pages",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first account key beginning with an at sign supplies the characters.",
    },
    {
      invariantKind: "departure",
      statement: "A character carrying no build hash is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A character carrying no name is named for the game's number for that character.",
    },
    {
      invariantKind: "departure",
      statement: "A build hash that will not decode is skipped and the rest are still imported.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tree holding fewer than four slotted champion stars is filled out with its own no-star.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line the catalog does not name is dropped before the hash is re-encoded.",
    },
    {
      invariantKind: "departure",
      statement: "Every imported character is re-encoded as having no ESO Plus.",
    },
    {
      invariantKind: "constraint",
      statement: "The account page is upserted before any character page.",
    },
    {
      invariantKind: "departure",
      statement: "A saved-variables file naming no character writes no page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
