import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatSupervisors = {
  id: "01a08859-4c01-7bf5-9ebc-b39e6b3406fa",
  type: "domain",
  slug: "seat-supervisors",
  definition: "the supervisor keeping an agent alive in its seat",
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
    "domain/supervisor-remote-control",
    "domain/supervisor-restarting",
    "domain/supervisor-resuming",
    "domain/supervisor-shutdown",
    "domain/supervisor-ticking",
    "domain/supervisor-tooling",
    "page-type/supervisor-action",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each thing a supervisor does is a domain naming the modules that do it.",
    },
  ],
} as const satisfies Domain
