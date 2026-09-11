import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const fileBackedRoster = {
  id: "01a08e9b-1ab8-71a3-8385-f3a640bf34df",
  type: "module",
  slug: "file-backed-roster",
  definition: "the page types whose pages are held as files",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which page types are backed by files is the page types `@akasha/pages-service` lists.",
    },
    {
      invariantKind: "departure",
      statement: "A browser reads that roster from the route its own app answers page types on.",
    },
    {
      invariantKind: "departure",
      statement: "That roster is asked once and held for a minute rather than per page read.",
    },
    {
      invariantKind: "departure",
      statement: "A roster with no page type refuses rather than reading as no page being a file.",
    },
  ],
} as const satisfies Module
