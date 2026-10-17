import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipientResolverDeps = {
  id: "01a0657d-a75e-7001-8ac5-1d57805bf5ae",
  type: "page-type/module",
  slug: "recipient-resolver-deps",
  definition: "the code a run calls",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose presence cannot be established is taken as present.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is told about at most once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later tick finding the same seat unrevivable tells nobody again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan is told where the seat that did not come back is the harness lead itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that never ran is started as a seat start would start it, with no parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a seat starts interactive unless its spec names another mode.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start that fails is said aloud and tried again on a later tick.",
    },
  ],
  createdAt: "2026-09-03T04:18:48.798Z",
  updatedAt: "2026-10-17T19:50:00.029Z",
} as const satisfies Module
