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
  invariants: [
    {
      invariantKind: "invariant-kind/gap",
      statement: "A `bun test` made inside the checkout is refused whatever paths that call names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `bun test` this reads as a command word is refused whatever paths it names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the apply rather than the draft as where the tests run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a `bun test` from this hook.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No word after the act is read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`bun run test` is not read here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "`bun test` runs a filter over every test file rather than a path `bun test` is handed.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The repository root is the akasha folder.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every test file the akasha folder has is an akasha test.",
    },
  ],
} as const satisfies AgentHook
