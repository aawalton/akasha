import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const nameSession = {
  id: "01a0941d-27f4-781c-aadd-02f86d00139e",
  type: "page-type/agent-hook",
  slug: "name-session",
  definition: "the hook that writes a seat's name into the seat's Claude Code session",
  code: "ts",
  test: "ts",
  runsAt: ["Stop"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A session is named for the seat whose agent is answering in that session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name is written into the transcript the harness reads a name from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session already carrying its seat's name is written nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop under no seat names nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The transcript written to is the one the payload names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This hook refuses nothing.",
    },
  ],
} as const satisfies AgentHook
