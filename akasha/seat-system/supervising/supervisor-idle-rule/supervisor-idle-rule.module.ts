import type { Module } from "@akasha/code-system/module"

export const supervisorIdleRule = {
  id: "01a06871-3115-7003-9d59-97c04e3f8140",
  pageTypeSlug: "module",
  slug: "supervisor-idle-rule",
  definition: "the questions about a seat's idleness that are put to the deciding rule",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An unreachable rule answers not idle, with the reason rule-unreachable.",
    },
    {
      invariantKind: "departure",
      statement: "The safe answer for cmdlines is that none of them are ignored.",
    },
    {
      invariantKind: "departure",
      statement: "A notice is null only where the rule truly decided.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that fails its shape falls to the safe answer, as a failed ask does.",
    },
    {
      invariantKind: "departure",
      statement: "Past cliff asks the same observation with busy children set aside.",
    },
    {
      invariantKind: "departure",
      statement: "All three questions are asked under the one rule name idleRule.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict's reason is the busyReason the rule states, not a fixed string.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a process, a port or a page.",
    },
  ],
} as const satisfies Module
