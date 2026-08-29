import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const pagesSystem = {
  id: "01a04a26-9105-7000-ab9a-ee74f7657636",
  pageTypeSlug: "domain",
  slug: "pages-system",
  definition: "how we keep track of things",
  partSlugs: ["page", "page-type", "page-property-type"],
  requiredReadingSlugs: ["page-type/page", "page-type/page-type", "page-type/page-property-type"],
  design: [
    "Page types and page property types are themselves page types.",
    "What makes a file a page is the page type its name carries.",
  ],
  rule: [
    {
      name: "Answer Or Refuse",
      act: "Refuse where you cannot answer, rather than answering as though there were nothing.",
      warrant: "A true empty and a failure read alike, and only one of them is a fault.",
      aids: [
        "Never read a missing source as an empty one.",
        "Never let a failed write return like a done one.",
      ],
    },
  ],
} as const satisfies Domain
