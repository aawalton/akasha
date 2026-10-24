import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatSupervisor = {
  id: "01a08859-4c01-7bf5-9ebc-b39e6b3406fa",
  type: "page-type/domain",
  slug: "seat-supervisor",
  definition: "a process that runs a seat's agent",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "supervisor" },
    { partOfSpeech: "part-of-speech/noun", spelling: "supervisors" },
  ],
  parts: [
    "domain/seat-claude-code-setup",
    "domain/supervisor-start",
    "domain/seat-agent-start",
    "domain/seat-agent-idleness",
    "domain/supervisor-log",
    "domain/seat-agent-run",
    "module/run-supervisor",
    "module/supervisor",
    "module/supervisor-args",
    "module/supervisor-config",
    "module/supervisor-exec",
    "module/supervisor-self-identity",
    "module/supervisor-state",
    "module/supervisor-types",

    "domain/seat-agent-restart",
    "domain/seat-work-restart",
    "domain/supervisor-stop",
    "domain/supervisor-timer",
    "domain/seat-agent-mcp",
    "page-type/supervisor-action",
    "domain/seat-auto-compact",
    "domain/seat-reply-notifying",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each thing a supervisor does is a domain naming the modules that do it.",
    },
  ],
  createdAt: "2026-09-09T22:45:48.673Z",
  updatedAt: "2026-10-24T20:00:51.010Z",
} as const satisfies Domain
