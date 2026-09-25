import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeAgentPage = {
  id: "01a0d90f-61b7-7f22-b661-78aa1a3e8fc7",
  type: "page-type/domain",
  slug: "change-agent-page",
  definition: "a change an agent makes to a whole page",
  parts: ["change-agent/rename-page", "change-agent/rename-pages"],
} as const satisfies Domain
