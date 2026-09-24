import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockAkashaReads = {
  id: "01a04eb3-0e18-748c-9e7f-ae84d9254e02",
  type: "page-type/agent-hook",
  slug: "block-akasha-reads",
  definition: "a refusal of a Read landing inside this checkout, naming the akasha read",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Read"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names `akasha read`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is judged by where that path lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path opening with `~` lands under the home folder, as Read takes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says the output must reach the agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read thrown away records nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The index is no page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A Read of the index is let through.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An image's bytes are no page's body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Read of an image's bytes is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image's bytes are told by the file property the image page type declares.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A search is no read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A Grep or Glob answer is not refused here.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The body of an akasha file an agent has seen is the body its record shows.",
    },
  ],
} as const satisfies AgentHook
