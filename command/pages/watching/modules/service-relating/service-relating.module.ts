import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceRelating = {
  id: "01a1843c-5b6d-7aa4-948d-4cb7f56c1aef",
  type: "page-type/module",
  slug: "service-relating",
  definition: "the streaming service pages the provider names TMDB gives a title reach",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A provider name reaches the streaming service page listing that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is looked up with the space around it trimmed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Names reaching one service are written as that service once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The services a title is given come out in the order they sort in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name no page lists gets a page of its own, titled with that name and listing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page made that way is neither free nor held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name met twice in one run gets one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name whose slug a service already has reaches that service.",
    },
  ],
  createdAt: "2026-10-28T20:38:30.445Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Module
