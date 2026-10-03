import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const recorders = {
  id: "01a0e057-cfa0-781d-ab55-d782157bb513",
  type: "page-type/step-status",
  slug: "recorders",
  title: "Recorders",
  definition: "the recorders' move, recording what a turn's prose settled, before its review",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One fresh agent runs for each story recorder whose step is recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each recorder drafts its edits and lands nothing itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory recorder hands in its memory as a file, and drafts no telling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last recorder advances the turn to reviewers, or to player once reviewed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each recorder's drafted edits land with its own advance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn whose recorders' edits refuse stays at recorders.",
    },
  ],
} as const satisfies StepStatus
