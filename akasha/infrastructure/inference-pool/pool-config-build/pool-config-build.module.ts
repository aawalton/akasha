import type { Module } from "@akasha/code-system/module"

export const poolConfigBuild = {
  id: "01a0685d-4b35-7006-9a61-f8b884dd2d47",
  pageTypeSlug: "module",
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
      statement: "A loopback service is fronted on 127.0.0.1 and every other on 0.0.0.0.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pool file folds into the traffic cop's hash, so changing it re-provisions the cop.",
    },
  ],
} as const satisfies Module
