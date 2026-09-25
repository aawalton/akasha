import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatLanding = {
  id: "01a0c9e4-772d-7926-92a2-cf5eb5f2aae8",
  type: "page-type/module",
  slug: "seat-landing",
  definition: "how code writes the page of a seat and how code removes the page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body matching the file the body would land in is not landed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's page is landed by a program rather than by an agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page goes in through the change adding a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that stopped has its page taken away with the files beside that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the index files no page at has that page alone taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That one refusal is the only refusal the page alone is taken away after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing that committed before it refused names that commit in the refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a seat's page sits is read from the one rule rather than spelled again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page written over hands in the body read from it, and a new page hands in none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body landed is composed elsewhere rather than laid out here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs the akasha command as a process.",
    },
  ],
} as const satisfies Module
