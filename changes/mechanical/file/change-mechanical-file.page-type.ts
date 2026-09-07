import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalFile = ChangeMechanical

export const changeMechanicalFile = {
  id: "01a07ba6-609b-7d7a-bf95-48bb415b1bc2",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-file",
  definition: "a mechanical change acting on where a file sits rather than on what that file holds",
  pluralSlug: "change-mechanical-file",
  extendsSlug: ["page-type/change-mechanical"],
} as const satisfies PageType
