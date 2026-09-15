import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorRemoteControl = {
  id: "01a09c78-e5b9-709e-bc75-2a6425da7d7b",
  type: "page-type/domain",
  slug: "supervisor-remote-control",
  definition: "a seat driven from away",
  parts: [
    "module/supervisor-rc-degraded-decide",
    "module/supervisor-rc-degraded-state",
    "module/supervisor-rc-degraded-thresholds",
    "module/supervisor-remote-control-decide",
    "module/supervisor-remote-control-default",
    "module/supervisor-remote-control-env",
  ],
} as const satisfies Domain
