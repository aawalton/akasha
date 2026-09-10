import type { PageType } from "../../../pages/types/page-type.page-type.ts"

export const changeMechanicalFileContent = {
  id: "01a07c97-c872-71a7-8e77-3ba5f2f974e0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "change-mechanical-file-content",
  definition: "a mechanical change acting on what a file holds under no narrower reading",
  pluralSlug: "change-mechanical-file-content",
  parts: [
    "domain/change-mechanical-file-content-add",
    "domain/change-mechanical-file-content-change",
    "domain/change-mechanical-file-content-move",
    "domain/change-mechanical-file-content-remove",
    "domain/change-mechanical-file-content-rename",
  ],
  extends: ["page-type/change-mechanical"],
  properties: [
    { pageProperty: "relation-property/change-target-type", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
