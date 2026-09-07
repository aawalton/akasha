import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeTargetSubtypeSlug } from "../../properties/change-target-subtype-slug.relation-property.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalFile = ChangeMechanical & {
  changeTargetTypeSlug: "change-target-type/file"
  changeTargetSubtypeSlug: ChangeTargetSubtypeSlug
}

export const changeMechanicalFile = {
  id: "01a07ba6-609b-7d7a-bf95-48bb415b1bc2",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-file",
  definition: "a mechanical change acting on where a file sits rather than on what that file holds",
  pluralSlug: "change-mechanical-file",
  extendsSlug: ["page-type/change-mechanical"],
  partSlugs: [
    "domain/change-mechanical-file-add",
    "domain/change-mechanical-file-remove",
    "domain/change-mechanical-file-move",
    "domain/change-mechanical-file-rename",
  ],
  properties: [
    { pagePropertySlug: "relation-property/change-target-type-slug", required: true, many: false },
    {
      pagePropertySlug: "relation-property/change-target-subtype-slug",
      required: true,
      many: false,
    },
  ],
} as const satisfies PageType
