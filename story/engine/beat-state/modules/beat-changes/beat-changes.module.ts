import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatChanges = {
  id: "01a1024c-c8c3-757f-8796-4aca742777e6",
  type: "page-type/module",
  slug: "beat-changes",
  definition:
    "the numbers and items each beat changes, checked and applied to the pages keeping them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change is one json line naming its beat, a page, a plain note and one act.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act sets a key from the value it held, appends a line to a list, or makes a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change from a value the page does not hold then is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number left below none is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change to a page no one filed is refused, unless a change before it made that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The note is the line the writer reads, at most 100 characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Caching applies every change and checks no value it started from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two seats' changes merge in beat order, each seat's in the order it handed them.",
    },
  ],
} as const satisfies Module
