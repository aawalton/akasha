import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorDeferredRestartDecide = {
  id: "01a0683e-3dbe-701b-b09a-df583a1df918",
  type: "module",
  slug: "supervisor-deferred-restart-decide",
  definition: "whether a deferred restart fires on this tick",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A busy session fires only where the same reason and transcript repeat.",
    },
    {
      invariantKind: "departure",
      statement: "A defer past its ceiling fires however busy the session reads.",
    },
    {
      invariantKind: "departure",
      statement: "An idle streak short of the threshold does not fire.",
    },
  ],
} as const satisfies Module
