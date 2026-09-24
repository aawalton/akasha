import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorStart = {
  id: "01a09c65-6205-7f39-a5fd-cf9bc52449c4",
  type: "page-type/domain",
  slug: "supervisor-start",
  definition: "a supervisor started",
  parts: [
    "module/seat-supervisor-claim",
    "module/supervisor-boot-prompt",
    "module/supervisor-boot-stage",
    "module/supervisor-interactive-boot",
    "module/supervisor-interactive-boot-contract",
    "module/supervisor-monitors-wire",
  ],
} as const satisfies Domain
