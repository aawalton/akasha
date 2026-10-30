import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const cooling = {
  id: "01a0bab7-a12a-7864-a9da-d54a152e1852",
  type: "page-type/module",
  slug: "cooling",
  definition: "the stretches Alan holds after a workout",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stretch cools Alan where its pattern is mobility and it is held rather than driven.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement stating no force is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The muscles to stretch are those the day's exercise sets worked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stretches reaching a muscle worked today lead, and the rest fill in behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch Alan logged today is gone from what he is offered today.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run shortens by the stretches the day already holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held stretch is timed, having no repetition to count.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads whether Alan is warm.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch Alan's kit cannot carry is no stretch to offer.",
    },
  ],
  createdAt: "2026-09-19T17:29:51.658Z",
  updatedAt: "2026-10-30T17:44:32.961Z",
} as const satisfies Module
