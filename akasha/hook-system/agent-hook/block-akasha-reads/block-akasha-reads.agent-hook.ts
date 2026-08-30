import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockAkashaReads = {
  id: "01a04eb3-0e18-748c-9e7f-ae84d9254e02",
  pageTypeSlug: "agent-hook",
  slug: "block-akasha-reads",
  definition: "a refusal of a Read landing inside the akasha folder, naming the akasha read",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Read"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Read landing inside the akasha folder is refused, and `akasha read` is named.",
    },
    {
      invariantKind: "departure",
      statement: "A path is judged by where it lands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal says the output must reach the agent, a read thrown away recording nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A call running outside the repository this hook stands in is let through.",
    },
    {
      invariantKind: "departure",
      statement: "What this does not reach is printed by the hook, and asked for with `--scope`.",
    },
    {
      invariantKind: "absence",
      statement: "The index is no page. A Read of `.git/data` stands.",
    },
    {
      invariantKind: "absence",
      statement: "A search is no read. What Grep and Glob show is not refused here.",
    },
    {
      invariantKind: "gap",
      statement: "What an agent has seen of an akasha file is what its record shows.",
    },
  ],
} as const satisfies AgentHook
