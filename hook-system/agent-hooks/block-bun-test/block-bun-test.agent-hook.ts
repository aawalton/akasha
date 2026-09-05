import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockBunTest = {
  id: "01a04eab-d4f8-7000-9dec-eba229399731",
  pageTypeSlug: "agent-hook",
  slug: "block-bun-test",
  definition: "a refusal of every bun test call made inside the akasha checkout",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `bun test` made inside the checkout is refused whatever paths it names.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names `akasha test`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prefix that only runs the call behind it does not hide a `bun test` from this hook.",
    },
    {
      invariantKind: "absence",
      statement: "No word after the act is read.",
    },
    {
      invariantKind: "absence",
      statement: "`bun run test` is not read here.",
    },
    {
      invariantKind: "constraint",
      statement:
        "What `bun test` runs is a filter over every test file rather than a path `bun test` is handed.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The repository root is the akasha folder, so every test file it holds is an akasha test.",
    },
  ],
} as const satisfies AgentHook
