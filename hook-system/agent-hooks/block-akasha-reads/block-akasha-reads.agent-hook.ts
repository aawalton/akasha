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
      statement: "The refusal names `akasha read`.",
    },
    {
      invariantKind: "departure",
      statement: "A path is judged by where that path lands.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says the output must reach the agent.",
    },
    {
      invariantKind: "departure",
      statement: "A read thrown away records nothing.",
    },
    {
      invariantKind: "absence",
      statement: "The index is no page.",
    },
    {
      invariantKind: "absence",
      statement: "A Read of `.git/data` is let through.",
    },
    {
      invariantKind: "absence",
      statement: "A search is no read.",
    },
    {
      invariantKind: "absence",
      statement: "A Grep or Glob answer is not refused here.",
    },
    {
      invariantKind: "gap",
      statement: "The body of an akasha file an agent has seen is the body its record shows.",
    },
  ],
} as const satisfies AgentHook
