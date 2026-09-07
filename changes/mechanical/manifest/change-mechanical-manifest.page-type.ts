import type { PageType } from "../../../pages/types/page-type.page-type.ts"
import type { ChangeMechanical } from "../change-mechanical.page-type.ts"

export type ChangeMechanicalManifest = ChangeMechanical

export const changeMechanicalManifest = {
  id: "01a07c41-bccd-79d5-9e2c-62625488915e",
  pageTypeSlug: "page-type",
  slug: "change-mechanical-manifest",
  definition: "a mechanical change acting on a package manifest rather than on a page's own body",
  pluralSlug: "change-mechanical-manifest",
  extendsSlug: ["page-type/change-mechanical"],
  partSlugs: [],
} as const satisfies PageType
