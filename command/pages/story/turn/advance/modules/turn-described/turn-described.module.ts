import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnDescribed = {
  id: "01a0e96d-d288-76ac-94d2-21b8dd6a0ec1",
  type: "page-type/module",
  slug: "turn-described",
  definition: "the mechanic pages whose description a turn made new or changed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn opens at the commit that first added the turn's page, whatever moved it since.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mechanic page is named where its description differs from the one it had as the turn opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the pages under the turn's story folder are looked at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A world's own mechanics are filed apart from any turn, so no change to one is named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What git says changed is what changed, so nothing is worked out a second time.",
    },
  ],
} as const satisfies Module
