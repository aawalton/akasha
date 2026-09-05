import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type PartslugProbeTwo = Page

export const partslugProbeTwo = {
  id: "01a071ad-e667-7bc2-82b3-42599535bc03",
  pageTypeSlug: "page-type",
  slug: "partslug-probe-two",
  definition: "a second disposable subject nothing keeps",
  pluralSlug: "partslug-probe-twos",
  extendsSlug: ["page-type/page"],
  properties: [],
} as const satisfies PageType
