import type { AgentHook } from "../agent-hook.page-type.ts"

export const nameSubagent = {
  id: "01a04fc3-fa00-7000-bbc9-a79135819969",
  pageTypeSlug: "agent-hook",
  slug: "name-subagent",
  definition: "a naming of a subagent by its seat and its own id, carried into the calls it makes",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is named by its seat and its own id together.",
    },
    {
      invariantKind: "departure",
      statement: "A name is honoured only where the seat's own id begins it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call a subagent makes carries its name, and a call the seat makes carries nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The name reaches a command through the environment of the call it runs in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name holding anything but what an id is written in is left off rather than spelled into a command.",
    },
    {
      invariantKind: "departure",
      statement: "A payload naming no subagent leaves the call as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "This hook changes what a call runs rather than judging it, and refuses nothing.",
    },
  ],
} as const satisfies AgentHook
