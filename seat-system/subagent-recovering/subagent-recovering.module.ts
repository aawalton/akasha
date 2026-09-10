import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const subagentRecovering = {
  id: "01a08d67-3a64-7f77-bb80-0d2661de12d7",
  pageTypeSlug: "module",
  type: "module",
  slug: "subagent-recovering",
  definition: "what a subagent left unlanded, moved onto the seat that dispatched it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The edits beside a subagent's page are the edits that subagent never landed.",
    },
    {
      invariantKind: "departure",
      statement: "An apply drops the rows it landed, so what is left was never landed.",
    },
    {
      invariantKind: "departure",
      statement: "The refusals beside a subagent's page are what the last landing it tried gave.",
    },
    {
      invariantKind: "departure",
      statement: "A run refusing nothing takes that file away, so a file there was never answered.",
    },
    {
      invariantKind: "departure",
      statement: "Every line is appended to the seat rather than replacing what the seat has.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal appended is opened by the slug of the subagent whose refusal it was.",
    },
    {
      invariantKind: "departure",
      statement: "One blank line parts the refusals of two subagents.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent with nothing beside it moves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A write here takes a lock keyed on the file the write writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "The paths written are the ones the seat page type names rather than spelled here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a page away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a subagent is gone.",
    },
  ],
} as const satisfies Module
