import type { Domain } from "../../domains/domain.page-type.ts"

export const changeAgent = {
  id: "01a07cc2-8419-7d4f-a616-e5771f155e24",
  pageTypeSlug: "domain",
  slug: "change-agent",
  definition: "a change an agent reaches by name",
  partSlugs: [
    "domain/change-agent-file",
    "domain/change-agent-folder",
    "domain/change-agent-file-content",
  ],
} as const satisfies Domain
