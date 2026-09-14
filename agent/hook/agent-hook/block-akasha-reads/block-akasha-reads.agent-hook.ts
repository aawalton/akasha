import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockAkashaReads = {
  id: "01a04eb3-0e18-748c-9e7f-ae84d9254e02",
  type: "agent-hook",
  slug: "block-akasha-reads",
  definition: "a refusal of a Read landing inside this checkout, naming the akasha read",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Read"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names `akasha read`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is judged by where that path lands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal says the output must reach the agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read thrown away records nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The index is no page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A Read of the index is let through.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A search is no read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A Grep or Glob answer is not refused here.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The body of an akasha file an agent has seen is the body its record shows.",
    },
  ],
} as const satisfies AgentHook
