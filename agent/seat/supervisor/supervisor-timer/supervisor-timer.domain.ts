import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorTimer = {
  id: "01a09c83-7bdc-70d7-8e92-d0198b88cd4e",
  type: "page-type/domain",
  slug: "supervisor-timer",
  definition: "the work a supervisor runs on a timer",
  parts: [
    "module/supervisor-guard-tick",
    "module/supervisor-heartbeat",
    "module/supervisor-heartbeat-beat",
    "module/supervisor-tick-saying",
  ],
} as const satisfies Domain
