import type { Module } from "@akasha/code-system/module"

export const seatAkashaBeside = {
  id: "01a06949-b281-7399-94cc-8935c2846c1f",
  pageTypeSlug: "module",
  slug: "seat-akasha-beside",
  definition: "where a seat's page is in akasha and where each of its values sits beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty agent id names no seat.",
    },
    {
      invariantKind: "departure",
      statement: "A page found by id is a seat only where its path is under the seats folder.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's slug is read off its page file name rather than out of the page.",
    },
    {
      invariantKind: "departure",
      statement: "A value asked for under a key the table does not name comes back as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The seat listing is taken once for each call rather than once for each seat.",
    },
    {
      invariantKind: "departure",
      statement: "The moment beside a seat is the modification time of the file holding it.",
    },
  ],
} as const satisfies Module
