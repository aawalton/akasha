import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeTargetSubtype } from "../../properties/change-target-subtype.relation-property.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalFolder = ChangeMechanical & {
  changeTargetType: "change-target-type/folder"
  changeTargetSubtype: ChangeTargetSubtype
}

export const changeMechanicalFolder = {
  id: "01a07ba6-609c-74fc-9684-d3a8d7baccfb",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "change-mechanical-folder",
  definition: "a mechanical change acting on the files a folder has rather than on one of them",
  pluralSlug: "change-mechanical-folder",
  extends: ["page-type/change-mechanical"],
  parts: ["domain/change-mechanical-folder-remove", "domain/change-mechanical-folder-move"],
  properties: [
    { pageProperty: "relation-property/change-target-type", required: true, many: false },
    {
      pageProperty: "relation-property/change-target-subtype",
      required: true,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "No rung here makes a folder, and git has no folder that is empty.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here renames a folder, a folder's rename being that folder's move.",
    },
  ],
} as const satisfies PageType
