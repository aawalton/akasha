import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeAgentFile = {
  id: "01a07cc2-47e0-7c08-b48a-bacf9c0f9386",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-agent-file",
  definition: "a change an agent reaches acting on where a file sits",
  parts: [
    "change-agent/add-file",
    "change-agent/change-page-page-type",
    "change-agent/move-page",
    "change-agent/remove-file",
    "change-agent/remove-page",
    "change-agent/rename-page",
    "change-agent/remove-page-type",
    "change-agent/rename-page-type",
    "change-agent/rename-pages",
    "change-agent/remove-package-manifest",
  ],
} as const satisfies Domain
