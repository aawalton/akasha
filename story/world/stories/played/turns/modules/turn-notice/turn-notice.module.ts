import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnNotice = {
  id: "01a0e3ab-3602-7b99-b42d-d5909d6fd17a",
  type: "page-type/module",
  slug: "turn-notice",
  definition: "whether a notice of a played turn still says where the turn is",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is read back into the turn and the status it was written with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is stale once its turn has left the status it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice is stale once a turn after its own exists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice naming a turn no page holds is not called stale.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
