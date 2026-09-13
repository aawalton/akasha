import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const supervisorAction = {
  id: "01a09c6f-77eb-7960-b01f-d162d3bcb8eb",
  type: "domain",
  slug: "supervisor-action",
  definition: "an action asked of a running seat",
  parts: [
    "module/seat-action",
    "module/seat-control",
    "module/supervisor-agent-action",
    "module/supervisor-agent-action-arm",
    "module/supervisor-agent-action-clear",
    "module/supervisor-agent-action-types",
    "module/supervisor-poll-agent-action",
    "page-type/supervisor-action",
  ],
} as const satisfies Domain
