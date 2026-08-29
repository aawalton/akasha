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
      statement:
        "A `bun test` naming no path is refused, because what it runs is then every test there is.",
    },
    {
      invariantKind: "departure",
      statement: "A `bun test` reaching the akasha folder is refused, and `akasha test` is named.",
    },
    {
      invariantKind: "departure",
      statement: "A `bun test` naming only paths outside the akasha folder is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A flag's value is never read as a path, so a filter alone bounds a call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call running outside the repository this hook stands in is let through, so a scratch copy is tested as usual.",
    },
    {
      invariantKind: "departure",
      statement: "What this does not reach is printed by the hook, and asked for with `--scope`.",
    },
    {
      invariantKind: "absence",
      statement: "`bun run test` is not read here, so a package script is not refused.",
    },
    {
      invariantKind: "constraint",
      statement: "What `bun test` runs is a filter over every test file, not a path it is handed.",
    },
    {
      invariantKind: "gap",
      statement: "A filter naming no akasha segment still reaches akasha, and is let through.",
    },
  ],
} as const satisfies AgentHook
