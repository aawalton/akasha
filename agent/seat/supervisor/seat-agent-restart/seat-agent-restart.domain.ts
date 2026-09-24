import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const seatAgentRestart = {
  id: "01a09c71-bd3a-7e1d-80f8-17fd6319d823",
  type: "page-type/domain",
  slug: "seat-agent-restart",
  definition: "a seat's agent restarted",
  parts: [
    "module/supervisor-deferred-restart",
    "module/supervisor-deferred-restart-decide",
    "module/supervisor-deferred-restart-log",
    "module/supervisor-deferred-restart-probe",
    "module/supervisor-deferred-restart-rule",
    "module/supervisor-precliff-restart",
    "module/supervisor-precliff-restart-decide",
    "module/agent-restart-notice-decide",
    "module/supervisor-resume-asks",
  ],
} as const satisfies Domain
