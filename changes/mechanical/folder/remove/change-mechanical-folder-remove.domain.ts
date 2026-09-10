import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const changeMechanicalFolderRemove = {
  id: "01a07cba-a0dd-78e7-8ddf-7002bfc44247",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-folder-remove",
  definition: "a mechanical change taking a folder away",
  parts: [
    "change-mechanical-folder/remove-folder",
    "change-mechanical-folder/remove-folder-package",
  ],
} as const satisfies Domain
