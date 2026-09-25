import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockBunTest = {
  id: "01a04eab-d4f8-7000-9dec-eba229399731",
  type: "page-type/agent-hook",
  slug: "block-bun-test",
  definition: "a refusal of every bun test call made inside the akasha checkout",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `bun test` the line holds made inside the checkout is refused whatever paths that call names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the apply rather than the draft as where the tests run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a `bun test` from this hook.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No word after the act is read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`bun run test` is not read here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "`bun test` runs a filter over every test file rather than a path `bun test` is handed.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The repository root is the akasha folder.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every test file the akasha folder has is an akasha test.",
    },
  ],
} as const satisfies AgentHook
