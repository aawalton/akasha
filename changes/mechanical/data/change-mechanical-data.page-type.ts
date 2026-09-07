import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalData = ChangeMechanical

export const changeMechanicalData = {
  id: "01a07ba6-609d-71a6-9b51-00b627c59556",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-data",
  definition: "a mechanical change acting on a body read as data",
  pluralSlug: "change-mechanical-data",
  extendsSlug: ["page-type/change-mechanical"],
  partSlugs: [],
} as const satisfies PageType
