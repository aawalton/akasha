import type { Domain } from "../../../domains/domain.page-type.ts"

export const changeAgentFolder = {
  id: "01a07cc2-5592-76c0-9945-aa8a44a111d0",
  pageTypeSlug: "domain",
  slug: "change-agent-folder",
  definition: "a change an agent reaches acting on a folder and everything under it",
  partSlugs: [
    "change-checked/move-folder",
    "change-checked/move-folder-package",
    "change-checked/remove-page-type",
  ],
} as const satisfies Domain
