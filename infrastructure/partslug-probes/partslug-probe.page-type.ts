import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type PartslugProbe = Page

export const partslugProbe = {
  id: "01a071c1-189e-7b94-a1c4-beb38c0f5374",
  pageTypeSlug: "page-type",
  slug: "partslug-probe",
  definition: "a disposable subject nothing keeps",
  pluralSlug: "partslug-probes",
  extendsSlug: ["page-type/page"],
  properties: [],
} as const satisfies PageType
