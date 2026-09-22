import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const procEnviron = {
  id: "01a0691b-4f63-79be-84d6-4d9546e6c1be",
  type: "page-type/module",
  slug: "proc-environ",
  definition: "an environment variable read off a process by its pid",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A process whose environ will not open answers null rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is split off the environ the way proc-reading splits that environ.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows an environment variable's meaning.",
    },
  ],
} as const satisfies Module
