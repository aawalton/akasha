import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removePageProperty = {
  id: "01a09c7a-b119-731f-b1f7-be0c81d02238",
  type: "page-type/change-agent",
  slug: "remove-page-property",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-property",
  changeTargetSubtype: "change-target-subtype/page-property",
  definition:
    "a page property taken away, off every page, record and entry, and off every declaration",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument this change was handed no value for is refused by its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The whole removal is worked out by the one rung this change reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That rung is reached through the runner rather than by importing that rung's code.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
