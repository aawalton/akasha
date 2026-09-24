import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAgentRun = {
  id: "01a09c67-78aa-706e-8909-443bee147ea1",
  type: "page-type/domain",
  slug: "seat-agent-run",
  definition: "a seat's agent run by a supervisor",
  parts: [
    "module/supervisor-interactive",
    "module/supervisor-interactive-iteration",
    "module/supervisor-interactive-seams",
    "module/supervisor-interactive-wire",
    "module/supervisor-iteration-outcome",
    "module/supervisor-iteration-outcome-db",
    "module/supervisor-iteration-outcome-handlers",
    "module/supervisor-loop-state",
  ],
} as const satisfies Domain
