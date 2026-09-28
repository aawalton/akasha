import type { StepStatus } from "akasha/story/chapter/step-status/step-status.page-type.types.ts"

export const recorders = {
  id: "01a0e057-cfa0-781d-ab55-d782157bb513",
  type: "page-type/step-status",
  slug: "recorders",
  title: "Recorders",
  definition: "the recorders' move, writing into pages what a turn's prose changed",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One fresh agent runs for each story recorder page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each recorder drafts its edits and lands nothing itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last recorder to finish advances the turn to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every recorder's edits land with the move to player, in one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn whose recorders' edits refuse stays at recorders.",
    },
  ],
} as const satisfies StepStatus
