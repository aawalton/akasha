import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCaptureDatamining = {
  id: "01a0608a-15b0-78f6-8e8e-282460347005",
  type: "page-type/domain",
  slug: "temper-capture-datamining",
  definition: "the shape a sweep of every item and quest id writes where the game saves it",
  parts: [
    "module/datamining-descriptor",
    "module/datamining-payload",
    "domain/temper-capture-datamining-reader",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The mining capture and every reader of that capture agree here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  createdAt: "2026-09-02T05:14:17.392Z",
  updatedAt: "2026-09-22T01:22:34.000Z",
} as const satisfies Domain
