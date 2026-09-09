import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeAgentFolder = {
  id: "01a07cc2-5592-76c0-9945-aa8a44a111d0",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-agent-folder",
  definition: "a change an agent reaches acting on a folder and everything under it",
  parts: [
    "change-agent/move-folder",
    "change-agent/move-folder-package",
    "change-agent/nest-commands",
    "change-agent/remove-folder",
    "change-agent/remove-folder-package",
  ],
} as const satisfies Domain
