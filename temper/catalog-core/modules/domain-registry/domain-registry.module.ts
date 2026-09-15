import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainRegistry = {
  id: "01a06071-0c79-71aa-8f49-de4128d97c66",
  type: "module",
  slug: "domain-registry",
  definition: "the collectors an add-on adds itself to, in the order they were added",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Importing a collector's module adds that collector here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Collectors are run in the order the collectors were added.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs a collector.",
    },
  ],
} as const satisfies Module
