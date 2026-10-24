import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatAkashaRead = {
  id: "01a06949-b281-701f-825a-4790c9603a69",
  type: "page-type/module",
  slug: "seat-akasha-read",
  definition: "the values of a seat read from akasha",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each value a seat states is answered under the key name the old page used.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is answered as the seat's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming a page is answered as the slug alone, and an assignment whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's persons are answered under the old person key as one principal.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A page from history stating one person rather than persons is read by that person.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is empty or missing is left out rather than answered as null.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seats are named by the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page is opened to find the seats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's activity is the moment the values observed of the seat were last written.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-10-24T17:50:28.120Z",
} as const satisfies Module
