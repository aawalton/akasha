import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const poolConfigBuild = {
  id: "01a0685d-4b35-7006-9a61-f8b884dd2d47",
  type: "module",
  slug: "pool-config-build",
  definition: "the pool file the traffic cop reads, built from the declared services",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a pool service reaches the pool file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool service missing an internal port raises rather than reaching the file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service is fronted on every address the host answers at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pool file folds into the traffic cop's hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Changing the pool file re-provisions the traffic cop.",
    },
  ],
} as const satisfies Module
