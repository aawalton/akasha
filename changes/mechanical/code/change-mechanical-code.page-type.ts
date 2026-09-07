import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalCode = ChangeMechanical & {
  changeTargetTypeSlug: "change-target-type/file-content"
  changeTargetSubtypeSlug: "change-target-subtype/code"
}

export const changeMechanicalCode = {
  id: "01a07ba6-609d-7ece-b8ee-5a663db2d58a",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-code",
  definition: "a mechanical change acting on a body read as code",
  pluralSlug: "change-mechanical-code",
  extendsSlug: ["page-type/change-mechanical"],
  partSlugs: [],
  properties: [
    { pagePropertySlug: "relation-property/change-target-type-slug", required: true, many: false },
    {
      pagePropertySlug: "relation-property/change-target-subtype-slug",
      required: true,
      many: false,
    },
  ],
} as const satisfies PageType
