import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorLog = {
  id: "01a09c85-63a7-7d18-9810-31274c95d4e9",
  type: "page-type/domain",
  slug: "supervisor-log",
  definition: "the log a supervisor writes",
  parts: [
    "module/supervisor-console",
    "module/supervisor-log-path",
    "module/supervisor-log-sweeping",
  ],
} as const satisfies Domain
