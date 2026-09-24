import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatSupervisor = {
  id: "01a08859-4c01-7bf5-9ebc-b39e6b3406fa",
  type: "page-type/domain",
  slug: "seat-supervisor",
  definition: "the supervisor keeping an agent alive in its seat",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "supervisor" },
    { partOfSpeech: "part-of-speech/noun", spelling: "supervisors" },
  ],
  parts: [
    "domain/supervisor-account",
    "domain/supervisor-boot",
    "domain/supervisor-child",
    "domain/supervisor-deciding",
    "domain/supervisor-idleness",
    "domain/supervisor-log",
    "domain/supervisor-loop",
    "domain/supervisor-process",
    "domain/supervisor-rebinding",

    "domain/supervisor-restarting",
    "domain/supervisor-resuming",
    "domain/supervisor-shutdown",
    "domain/supervisor-ticking",
    "domain/supervisor-tooling",
    "page-type/supervisor-action",
    "domain/supervisor-compacting",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each thing a supervisor does is a domain naming the modules that do it.",
    },
  ],
} as const satisfies Domain
