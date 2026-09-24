import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorRestart = {
  id: "01a08865-01fe-7c5a-ad92-7c42a01e7c23",
  type: "page-type/domain",
  slug: "supervisor-restart",
  definition: "a supervisor restarted on current code",
  parts: [
    "module/supervisor-file-version",
    "module/supervisor-handoff-env",
    "module/supervisor-reexec",
    "module/supervisor-reexec-mark",
    "module/supervisor-restart-on-change",
    "module/supervisor-restart-install",
    "module/supervisor-restart-jitter-decide",
    "module/supervisor-restart-jitter-rule",
    "module/supervisor-restart-state",
  ],
} as const satisfies Domain
