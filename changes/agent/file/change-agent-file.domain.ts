import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeAgentFile = {
  id: "01a07cc2-47e0-7c08-b48a-bacf9c0f9386",
  pageTypeSlug: "domain",
  slug: "change-agent-file",
  definition: "a change an agent reaches acting on where a file sits",
  partSlugs: [
    "change-authored/add-file",
    "change-checked/change-page-page-type",
    "change-checked/move-page",
    "change-checked/remove-file",
    "change-checked/remove-page",
    "change-checked/rename-page",
  ],
} as const satisfies Domain
