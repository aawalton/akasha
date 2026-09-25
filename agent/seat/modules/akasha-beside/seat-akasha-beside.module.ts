import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatAkashaBeside = {
  id: "01a06949-b281-7399-94cc-8935c2846c1f",
  type: "page-type/module",
  slug: "seat-akasha-beside",
  definition: "the path of a seat's page and the values stored with the seat's page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty agent id names no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page is a seat by the page type filing it rather than by the folder it sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat named is reached by asking the index for that name under the seat type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder a seat's page sits in is written in this code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's slug is read off its page file name rather than out of the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent is answered the page of the seat above that subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value asked for under a key the table does not name comes back as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat listing is taken once for each call rather than once for each seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The moment beside a seat is the modification time of the file with the value beside that seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An empty text beside a seat is answered as no value rather than as an empty value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The mode a seat is running in is written beside that seat on the beat its process key is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pid holding a seat is read out of that seat's process key and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no process key beside it is held by no pid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value beside a seat naming a page is read as that page's slug alone.",
    },
  ],
} as const satisfies Module
