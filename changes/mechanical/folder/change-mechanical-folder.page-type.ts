import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalFolder = ChangeMechanical

export const changeMechanicalFolder = {
  id: "01a07ba6-609c-74fc-9684-d3a8d7baccfb",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-folder",
  definition: "a mechanical change acting on the files a folder holds rather than on one of them",
  pluralSlug: "change-mechanical-folder",
  extendsSlug: ["page-type/change-mechanical"],
  partSlugs: [],
} as const satisfies PageType
