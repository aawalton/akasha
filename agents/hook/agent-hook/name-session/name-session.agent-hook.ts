import type { AgentHook } from "akasha/agents/hook/agent-hook/agent-hook.page-type.types.ts"

export const nameSession = {
  id: "01a0941d-27f4-781c-aadd-02f86d00139e",
  type: "agent-hook",
  slug: "name-session",
  definition: "a naming of a seat's Claude Code session for that seat, as the session ends a turn",
  code: "ts",
  test: "ts",
  runsAt: ["Stop"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session is named for the seat whose agent is answering in that session.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name is written into the transcript the harness reads a name from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A session already carrying its seat's name is written nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stop under no seat names nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The transcript written to is the one the payload names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This hook refuses nothing.",
    },
  ],
} as const satisfies AgentHook
