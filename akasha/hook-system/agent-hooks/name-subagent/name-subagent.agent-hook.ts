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
      statement: "A name is honoured only where the seat's own id begins the name.",
    },
    {
      invariantKind: "departure",
      statement: "A call the seat makes carries nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name reaches a command through the environment of the call the command runs in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name holding anything but what an id is written in is left off rather than spelled into a command.",
    },
    {
      invariantKind: "departure",
      statement: "A payload naming no subagent leaves the call as the call stands.",
    },
    {
      invariantKind: "departure",
      statement: "This hook changes what a call runs rather than judging it.",
    },
    {
      invariantKind: "departure",
      statement: "This hook refuses nothing.",
    },
  ],
} as const satisfies AgentHook
