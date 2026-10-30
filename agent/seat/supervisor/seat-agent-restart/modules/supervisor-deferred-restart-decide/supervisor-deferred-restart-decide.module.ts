import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorDeferredRestartDecide = {
  id: "01a0683e-3dbe-701b-b09a-df583a1df918",
  type: "page-type/module",
  slug: "supervisor-deferred-restart-decide",
  definition: "whether an agent in a seat is restarted at this time",
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
  createdAt: "2026-09-03T17:08:24.638Z",
  updatedAt: "2026-10-30T14:40:28.026Z",
} as const satisfies Module
