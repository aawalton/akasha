import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnChecklistServing = {
  id: "01a18ce3-823d-752d-b520-665b019da399",
  type: "page-type/module",
  slug: "turn-checklist-serving",
  definition: "the checklist of a one-seat story's open turn, read from that turn as it is now",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The open turn is the story's earliest turn not at player or still owing its memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no open turn has its game master seat end its turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item's notice is composed as the notice to that step's seat is, from the turn as it is now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A role page an item names is found in the index by the role's slug.",
    },
  ],
  createdAt: "2026-10-30T12:58:02.685Z",
  updatedAt: "2026-10-30T15:38:23.605Z",
} as const satisfies Module
