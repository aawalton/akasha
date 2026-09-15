import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorTicking = {
  id: "01a09c83-7bdc-70d7-8e92-d0198b88cd4e",
  type: "domain",
  slug: "supervisor-ticking",
  definition: "the beat a supervisor runs its watches on",
  parts: [
    "module/supervisor-guard-tick",
    "module/supervisor-heartbeat",
    "module/supervisor-heartbeat-beat",
    "module/supervisor-tick-saying",
  ],
} as const satisfies Domain
