import type { Page } from "./page.page-type.ts"

export type PageType = Page & {
  extendsSlug: string | null
}

export const pageType = {
  id: "01a049ae-fe2c-7343-8ab6-f94d8927164a",
  slug: "page-type",
  definition: "the specification for a kind of page",
  extendsSlug: "page",
} as const satisfies PageType
