import type { Module } from "@akasha/code-system/module"

export const watcherSettingsEquipment = {
  id: "01a06381-35cf-70c2-819c-ef562701572b",
  pageTypeSlug: "module",
  slug: "watcher-settings-equipment",
  definition: "an account's target builds read from its pages and the gear those builds want",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Characters and companions come back ordered by the sort order each carries.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying no sort order comes back last.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose eso character id is no text is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A build page absent leaves the character with no target build hash.",
    },
    {
      invariantKind: "departure",
      statement: "A build hash that is no text reads as no build hash.",
    },
    {
      invariantKind: "departure",
      statement: "One build page is read once however many characters name that build.",
    },
    {
      invariantKind: "departure",
      statement: "A live build is read only where the live build hash is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what reads the pages.",
    },
    {
      invariantKind: "absence",
      statement: "No build hash is decoded here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "gap",
      statement: "Every page read here refuses.",
    },
    {
      invariantKind: "gap",
      statement: "`@akasha/pages-system-service` lists no `character-build` page type.",
    },
    {
      invariantKind: "gap",
      statement: "`@akasha/pages-system-service` lists no `companion-build` page type.",
    },
  ],
} as const satisfies Module
