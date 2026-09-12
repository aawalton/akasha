import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeAgentFile = {
  id: "01a07cc2-47e0-7c08-b48a-bacf9c0f9386",
  type: "domain",
  slug: "change-agent-file",
  definition: "a change an agent reaches acting on where a file sits",
  parts: [
    "change-agent/add-binary-file",
    "change-agent/add-file",
    "change-agent/change-page-page-type",
    "change-agent/divide-page-property",
    "change-agent/move-page",
    "change-agent/move-pages",
    "change-agent/remove-file",
    "change-agent/remove-package-manifest",
    "change-agent/remove-page",
    "change-agent/remove-page-type",
    "change-agent/rename-page",
    "change-agent/rename-page-type",
    "change-agent/rename-pages",
  ],
} as const satisfies Domain
