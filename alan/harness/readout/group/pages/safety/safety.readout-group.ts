import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const safety = {
  id: "01a05f42-92f5-7003-8df0-f5215872a280",
  type: "page-type/readout-group",
  slug: "safety",
  definition: "how safe Alan is",
  figureOffScale: true,
  wireKeyName: "habit",
  servedBy: ["route/safety-level", "route/jenny-safety-level"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The color reports where Alan is rather than whether Alan did well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level draws its figure at either end of its scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tile draws that figure alone.",
    },
  ],
  createdAt: "2026-09-01T23:16:33.653Z",
  updatedAt: "2026-10-30T15:58:41.386Z",
} as const satisfies ReadoutGroup
