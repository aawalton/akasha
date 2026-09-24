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
    "domain/supervisor-rebinding",
    "module/run-supervisor",
    "module/supervisor",
    "module/supervisor-args",
    "module/supervisor-config",
    "module/supervisor-exec",
    "module/supervisor-self-identity",
    "module/supervisor-session-project-dir",
    "module/supervisor-state",
    "module/supervisor-types",

    "domain/seat-agent-restart",
    "domain/supervisor-resuming",
    "domain/supervisor-shutdown",
    "domain/supervisor-ticking",
    "domain/supervisor-tooling",
    "page-type/supervisor-action",
    "domain/seat-auto-compact",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each thing a supervisor does is a domain naming the modules that do it.",
    },
  ],
} as const satisfies Domain
