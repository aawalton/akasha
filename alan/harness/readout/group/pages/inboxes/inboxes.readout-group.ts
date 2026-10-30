import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const inboxes = {
  id: "01a06230-b155-7b8c-9044-28e5319d83e7",
  type: "page-type/readout-group",
  slug: "inboxes",
  definition: "how many things wait in each inbox Alan has",
  figureOffScale: true,
  wireKeyName: "inbox",
  statusBarSection: "inbox",
  servedBy: ["route/inbox-stoplights"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An inbox of at least ten thousand is black rather than a reading gone missing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inbox at empty is blue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color any other reading takes is stated by that reading's own scale.",
    },
  ],
  createdAt: "2026-09-02T12:55:53.429Z",
  updatedAt: "2026-10-30T16:02:35.646Z",
} as const satisfies ReadoutGroup
