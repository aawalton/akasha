import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorProcess = {
  id: "01a09c62-651a-7488-a701-7a1b46e37c2d",
  type: "domain",
  slug: "supervisor-process",
  definition: "the program a supervisor runs as",
  parts: [
    "module/run-supervisor",
    "module/supervisor",
    "module/supervisor-args",
    "module/supervisor-config",
    "module/supervisor-exec",
    "module/supervisor-self-identity",
    "module/supervisor-session-project-dir",
    "module/supervisor-state",
    "module/supervisor-types",
  ],
} as const satisfies Domain
