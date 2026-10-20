import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCapturePassiveMap = {
  id: "01a0616b-18bf-7c2e-9cbf-644b6da6a01a",
  type: "page-type/module",
  slug: "character-capture-passive-map",
  definition: "which bit of a build hash's passive field each passive skill holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The places are read from the passive pages as the add-on compiles, in hashPlace order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive on a companion line holds no place here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The encoder finds a passive held at another rank by asking the game each rank's id.",
    },
  ],
  createdAt: "2026-09-02T09:20:03.775Z",
  updatedAt: "2026-10-20T01:59:27.731Z",
} as const satisfies Module
