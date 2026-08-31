import type { AgentHook } from "../agent-hook.page-type.ts"

export const stateSubagent = {
  id: "01a0598f-18de-7467-a5af-de60b85fefd7",
  pageTypeSlug: "agent-hook",
  slug: "state-subagent",
  definition: "a subagent's page, put up when it starts and taken away when it stops",
  code: "ts",
  test: "ts",
  runsAt: ["SubagentStart", "SubagentStop"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent standing is a page standing.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent that has stopped has no page.",
    },
    {
      invariantKind: "departure",
      statement: "The seat is named by the page the index carries for the id the call runs under.",
    },
    {
      invariantKind: "departure",
      statement: "A payload naming no subagent leaves what stands as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A start naming no kind puts up nothing.",
    },
    {
      invariantKind: "departure",
      statement: "This hook changes what stands rather than judging a call.",
    },
    {
      invariantKind: "departure",
      statement: "This hook refuses nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The subagent begins and ends either way.",
    },
  ],
} as const satisfies AgentHook
