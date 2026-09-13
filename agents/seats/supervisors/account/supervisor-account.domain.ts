import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const supervisorAccount = {
  id: "01a09c6e-0972-7d7e-a85f-aaec209ffd5b",
  type: "domain",
  slug: "supervisor-account",
  definition: "the account a seat runs under",
  parts: [
    "module/supervisor-account-config",
    "module/supervisor-agent",
    "module/supervisor-claude-config",
    "module/supervisor-usage-snapshot",
  ],
} as const satisfies Domain
