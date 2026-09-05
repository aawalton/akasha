import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type PartslugProbe = Page

export const partslugProbe = {
  id: "01a071ac-a793-7e80-a9cb-c60f55268ec0",
  pageTypeSlug: "page-type",
  slug: "partslug-probe",
  definition: "a disposable subject nothing keeps",
  pluralSlug: "partslug-probes",
  extendsSlug: ["page-type/page"],
  properties: [],
} as const satisfies PageType
