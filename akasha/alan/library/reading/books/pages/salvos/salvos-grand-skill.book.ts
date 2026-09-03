import type { Book } from "../../book.page-type.ts"

export const salvosGrandSkill = {
  id: "019db533-f391-75c3-bec6-2cbf4d4772bb",
  pageTypeSlug: "book",
  slug: "salvos-grand-skill",
  title: "Salvos: Grand Skill",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 6,
  ownLength: 132000,
  publishedAt: "2022-06-02",
  partOfSlugs: ["book-series/salvos"],
  source: "kindle",
  externalId: "B09Y3GKGMW",
  externalLink: "https://amazon.com/dp/B09Y3GKGMW",
} as const satisfies Book
