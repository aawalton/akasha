import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeAgentFile = {
  id: "01a07cc2-47e0-7c08-b48a-bacf9c0f9386",
  type: "page-type/domain",
  slug: "change-agent-file",
  definition: "a change an agent makes to a whole file",
  parts: [
    "change-agent/add-binary-file",
    "change-agent/add-file",
    "change-agent/change-page-page-type",
    "change-agent/divide-file-code",
    "change-agent/divide-page-property",
    "change-agent/move-page",
    "change-agent/move-pages",
    "change-agent/remove-file",
    "change-agent/remove-page",
    "change-agent/remove-page-type",
    "change-agent/move-pages-under",
    "change-agent/add-game-mechanic",
    "change-agent/move-file",
    "change-agent/add-image",
  ],
} as const satisfies Domain
