import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theIllusionistNomadSoul = {
  id: "019db533-f38a-7359-a1bd-8231315cac3a",
  type: "page-type/book",
  slug: "the-illusionist-nomad-soul",
  title: "The Illusionist: Nomad Soul",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 96000,
  ownProgress: 96000,
  publishedAt: "2019-02-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07N1RGWTC",
      externalLink: "https://amazon.com/dp/B07N1RGWTC",
    },
  ],
} as const satisfies Book
