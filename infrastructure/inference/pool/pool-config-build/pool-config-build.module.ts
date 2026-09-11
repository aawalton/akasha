import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const poolConfigBuild = {
  id: "01a0685d-4b35-7006-9a61-f8b884dd2d47",
  type: "module",
  slug: "pool-config-build",
  definition: "the pool file the traffic cop reads, built from the declared services",
  code: "ts",
  invariants: [
    { invariantKind: "departure", statement: "Only a pool service reaches the pool file." },
    {
      invariantKind: "departure",
      statement: "A pool service missing an internal port raises rather than reaching the file.",
    },
    {
      invariantKind: "departure",
      statement: "A service is fronted on every address the host answers at.",
    },
    {
      invariantKind: "departure",
      statement: "The pool file folds into the traffic cop's hash.",
    },
    {
      invariantKind: "departure",
      statement: "Changing the pool file re-provisions the traffic cop.",
    },
  ],
} as const satisfies Module
