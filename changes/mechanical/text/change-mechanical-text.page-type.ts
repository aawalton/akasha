import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalText = ChangeMechanical & {
  changeTargetTypeSlug: "change-target-type/file-content"
  changeTargetSubtypeSlug: "change-target-subtype/page-property-prose"
}

export const changeMechanicalText = {
  id: "01a07ba6-609d-7990-846f-5fa9c55e643a",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-text",
  definition: "a mechanical change acting on a body read as text",
  pluralSlug: "change-mechanical-text",
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
