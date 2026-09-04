import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const agentHarness = {
  id: "01a06588-ed4e-7908-8027-221aae7b6cab",
  pageTypeSlug: "domain",
  slug: "agent-harness",
  definition: "how agents do things",
  partSlugs: [
    "domain/claude-code",
    "domain/message-warrant-announce",
    "domain/message-warrant-blocked",
    "module/account-upkeep-running",
    "module/account-upkeep-stall-reading",
  ],
} as const satisfies Domain
