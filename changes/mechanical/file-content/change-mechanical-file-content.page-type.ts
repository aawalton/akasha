import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalFileContent = ChangeMechanical & {
  changeTargetType: "change-target-type/file-content"
}

export const changeMechanicalFileContent = {
  id: "01a07c97-c872-71a7-8e77-3ba5f2f974e0",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-file-content",
  definition: "a mechanical change acting on what a file holds under no narrower reading",
  pluralSlug: "change-mechanical-file-content",
  partSlugs: [
    "domain/change-mechanical-file-content-add",
    "domain/change-mechanical-file-content-change",
    "domain/change-mechanical-file-content-move",
    "domain/change-mechanical-file-content-remove",
    "domain/change-mechanical-file-content-rename",
  ],
  extends: ["page-type/change-mechanical"],
  properties: [
    { pagePropertySlug: "relation-property/change-target-type", required: true, many: false },
  ],
} as const satisfies PageType
