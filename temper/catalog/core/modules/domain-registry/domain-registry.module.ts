import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainRegistry = {
  id: "01a06071-0c79-71aa-8f49-de4128d97c66",
  type: "page-type/module",
  slug: "domain-registry",
  definition: "the collectors an add-on adds itself to, in the order they were added",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Importing a collector's module adds that collector here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Collectors are run in the order the collectors were added.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a collector.",
    },
  ],
  createdAt: "2026-09-02T04:46:56.633Z",
  updatedAt: "2026-09-21T15:11:26.000Z",
} as const satisfies Module
