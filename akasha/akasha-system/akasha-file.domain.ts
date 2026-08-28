import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaFile = {
  id: "01a049e9-651c-7004-a164-c9c8df818b18",
  pageTypeSlug: "domain",
  slug: "akasha-file",
  definition: "a file in the `akasha` folder",
  design: [
    "A page property's file is named for its page and for the property it holds.",
  ],
  condition: [
    "Every file is a page or one page property's own file.",
  ],
} as const satisfies Domain
