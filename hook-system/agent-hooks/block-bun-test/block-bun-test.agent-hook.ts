import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockBunTest = {
  id: "01a04eab-d4f8-7000-9dec-eba229399731",
  pageTypeSlug: "agent-hook",
  slug: "block-bun-test",
  definition: "a refusal of the bun test calls naming nothing or reaching the akasha folder",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A `bun test` naming no path runs every test there is and is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names `akasha test`.",
    },
    {
      invariantKind: "departure",
      statement: "A `bun test` naming only paths outside the akasha folder is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A flag's value is never read as a path.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix that only runs the call behind it does not hide a `bun test` from this.",
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
      invariantKind: "gap",
      statement: "A filter naming no akasha segment still reaches akasha and is let through.",
    },
  ],
} as const satisfies AgentHook
