import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryReaperGlobal = {
  id: "01a0686c-f06b-7002-9ec8-2c68f87e02a6",
  type: "page-type/module",
  slug: "memory-reaper-global",
  definition: "what the host gives up when its own memory headroom is gone",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The headroom leg trips only where swap is drained as well as memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host with no swap at all counts as a host whose swap is drained.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The largest supervisor tree goes before any single process is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The largest single process is taken only where no tree has anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing else is killed until the kill before it has had time to settle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The window resets the moment the leg reads clear rather than when that window expires.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recovery window holds only while the memory the host has left is holding.",
    },
  ],
} as const satisfies Module
