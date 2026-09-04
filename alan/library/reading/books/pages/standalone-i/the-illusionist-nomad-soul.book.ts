import type { Book } from "../../book.page-type.ts"

export const theIllusionistNomadSoul = {
  id: "019db533-f38a-7359-a1bd-8231315cac3a",
  pageTypeSlug: "book",
  slug: "the-illusionist-nomad-soul",
  title: "The Illusionist: Nomad Soul",
  status: "completed",
  unitSlug: "words",
  position: 1,
  ownLength: 96000,
  ownProgress: 96000,
  publishedAt: "2019-02-12",
  source: "kindle",
  externalId: "B07N1RGWTC",
  externalLink: "https://amazon.com/dp/B07N1RGWTC",
} as const satisfies Book
