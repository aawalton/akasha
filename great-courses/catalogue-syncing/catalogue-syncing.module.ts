import type { Module } from "@akasha/code-system/module"

export const catalogueSyncing = {
  id: "01a0686a-7a57-7999-b904-b23c1ed07377",
  pageTypeSlug: "module",
  slug: "catalogue-syncing",
  definition: "the Great Courses catalogue read and a page filed for each course not already held",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every course and every subject shelf is taken off the one catalogue read.",
    },
    {
      invariantKind: "departure",
      statement: "A page is written for each course the collection does not already hold.",
    },
    {
      invariantKind: "departure",
      statement:
        "A course sits on the All Great Courses shelf and on the shelf of every subject naming it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is written where the collection's root says it synced inside the last thirty days.",
    },
    {
      invariantKind: "departure",
      statement: "The run stands as a row under the source it synced.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run in which any course failed ends non-zero, so a failed run is a failed unit.",
    },
    {
      invariantKind: "departure",
      statement:
        "Everything is read and written in this process, off the checkouts on this machine.",
    },
    {
      invariantKind: "absence",
      statement: "No credential stands behind the run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is reached over the network but the catalogue itself.",
    },
  ],
} as const satisfies Module
