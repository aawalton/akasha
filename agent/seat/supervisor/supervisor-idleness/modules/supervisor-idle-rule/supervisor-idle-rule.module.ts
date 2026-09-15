import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorIdleRule = {
  id: "01a06871-3115-7003-9d59-97c04e3f8140",
  type: "page-type/module",
  slug: "supervisor-idle-rule",
  definition: "the questions about a seat's idleness that are put to the deciding rule",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unreachable rule answers not idle with the reason rule-unreachable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The safe answer for cmdlines is that no cmdline is ignored.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A notice is null only where the rule truly decided.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer that fails its shape falls to the safe answer as a failed ask does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Past cliff asks the same observation with busy children set aside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "All three questions are asked under the one rule name idleRule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A verdict's reason is the busyReason the rule states rather than a fixed string.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a process or a port or a page.",
    },
  ],
} as const satisfies Module
