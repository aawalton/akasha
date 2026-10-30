import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnChecklist = {
  id: "01a18ce3-823e-747b-92e3-c79fcaf321f4",
  type: "page-type/module",
  slug: "turn-checklist",
  definition: "the checklist a one-seat story's game master seat works a turn by",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The checklist covers every step the seats of a seat-graph turn cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its items run lore, beats, every beat's numbers, then every beat's prose, each review, memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Memory is one item for the whole turn, the last, worked once the turn is at player.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No item asks for pictures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn sent off the beats runs its numbers, prose, records and reviews as its status says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat a numbers item refused is stated again as the item before its numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each item is done or not as the turn's status, beats file, reviewers and recorders say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The item worked now is the first one not done, and only its instructions are said in full.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item's instructions are the prompt or notice that step's seat is sent, in its one-seat form.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item another role works names that role's page, for the seat to read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beats with the same marks share one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item is named as `turn-step-naming` names its step, as its hand-in's timing row is.",
    },
  ],
  createdAt: "2026-10-30T12:58:02.685Z",
  updatedAt: "2026-10-30T15:38:23.605Z",
} as const satisfies Module
