import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supervisorAccount = {
  id: "01a09c6e-0972-7d7e-a85f-aaec209ffd5b",
  type: "page-type/domain",
  slug: "supervisor-account",
  definition: "a seat's account",
  parts: [
    "module/supervisor-account-config",
    "module/supervisor-agent",
    "module/supervisor-claude-config",
    "module/supervisor-usage-snapshot",
  ],
} as const satisfies Domain
