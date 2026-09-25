import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const nameSubagent = {
  id: "01a04fc3-fa00-7000-bbc9-a79135819969",
  type: "page-type/agent-hook",
  slug: "name-subagent",
  definition:
    "the hook that writes a subagent's id and its seat's id into each shell command the subagent runs",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is honoured only where the seat's own id begins the name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call the seat makes has nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name reaches a command through the environment of the call the command runs in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name with a character no id is written in is left off rather than spelled into a command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A payload naming no subagent leaves the call as the call is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This hook changes the command a call runs rather than judging that call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This hook refuses nothing.",
    },
  ],
} as const satisfies AgentHook
