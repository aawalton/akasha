import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorDeferredRestartDecide = {
  id: "01a0683e-3dbe-701b-b09a-df583a1df918",
  type: "page-type/module",
  slug: "supervisor-deferred-restart-decide",
  definition: "whether a deferred restart fires on this tick",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A busy session fires only where the same reason and transcript repeat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A defer past its ceiling fires however busy the session reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An idle streak short of the threshold does not fire.",
    },
  ],
} as const satisfies Module
