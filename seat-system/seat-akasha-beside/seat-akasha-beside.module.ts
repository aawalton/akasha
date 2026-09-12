import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const seatAkashaBeside = {
  id: "01a06949-b281-7399-94cc-8935c2846c1f",
  type: "module",
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
      statement:
        "A page is a seat by the page type filing it rather than by the folder it sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A seat named is reached by asking the index for that name under the seat type.",
    },
    {
      invariantKind: "absence",
      statement: "No folder a seat's page sits in is written in this code.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's slug is read off its page file name rather than out of the page.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent is answered the page of the seat above that subagent.",
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
      statement:
        "The moment beside a seat is the modification time of the file with the value beside that seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "An empty text beside a seat is answered as no value rather than as an empty value.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mode a seat is running in is written beside that seat on the beat its process key is written.",
    },
  ],
} as const satisfies Module
