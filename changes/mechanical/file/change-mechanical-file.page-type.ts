import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeTargetSubtype } from "../../properties/change-target-subtype.relation-property.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalFile = ChangeMechanical & {
  changeTargetType: "change-target-type/file"
  changeTargetSubtype: ChangeTargetSubtype
}

export const changeMechanicalFile = {
  id: "01a07ba6-609b-7d7a-bf95-48bb415b1bc2",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-file",
  definition: "a mechanical change acting on where a file sits rather than on what that file holds",
  pluralSlug: "change-mechanical-file",
  extends: ["page-type/change-mechanical"],
  parts: [
    "domain/change-mechanical-file-add",
    "domain/change-mechanical-file-remove",
    "domain/change-mechanical-file-move",
    "domain/change-mechanical-file-add-if-not-present",
    "domain/change-mechanical-file-rename",
  ],
  properties: [
    { pagePropertySlug: "relation-property/change-target-type", required: true, many: false },
    {
      pagePropertySlug: "relation-property/change-target-subtype",
      required: true,
      many: false,
    },
  ],
} as const satisfies PageType
