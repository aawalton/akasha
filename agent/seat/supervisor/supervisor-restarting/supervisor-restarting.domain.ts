import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorRestarting = {
  id: "01a09c71-bd3a-7e1d-80f8-17fd6319d823",
  type: "domain",
  slug: "supervisor-restarting",
  definition: "a restart held back until the session can take it",
  parts: [
    "module/supervisor-deferred-restart",
    "module/supervisor-deferred-restart-decide",
    "module/supervisor-deferred-restart-log",
    "module/supervisor-deferred-restart-probe",
    "module/supervisor-deferred-restart-rule",
    "module/supervisor-precliff-restart",
    "module/supervisor-precliff-restart-decide",
    "module/supervisor-precliff-restart-rule",
    "module/supervisor-restart-notice-decide",
    "module/supervisor-resume-asks",
    "module/supervisor-resume-notices",
  ],
} as const satisfies Domain
