import type { Module } from "@akasha/code-system/module"

export const catalogEntry = {
  id: "01a063ba-94e5-7d65-8774-cc57b1701594",
  pageTypeSlug: "module",
  slug: "catalog-entry",
  definition: "what the add-on does once the game has loaded it and its saved table is ready",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The order the nineteen collectors are imported in is the collection order.",
    },
    {
      invariantKind: "departure",
      statement: "The saved table is reachable only after the capture writer hands the table over.",
    },
    {
      invariantKind: "departure",
      statement: "A side file request is applied before any collector is offered a run.",
    },
    {
      invariantKind: "departure",
      statement: "The first collection waits for the player rather than for the add-on load.",
    },
  ],
} as const satisfies Module
