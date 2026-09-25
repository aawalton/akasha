import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHeartfireHealerResurrection = {
  id: "019db533-f38a-730e-bf63-49e2953eec70",
  type: "page-type/book",
  slug: "the-heartfire-healer-resurrection",
  title: "The Heartfire Healer: Resurrection",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 97000,
  publishedAt: "2021-06-15",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0947GTHFR",
      externalLink: "https://amazon.com/dp/B0947GTHFR",
    },
  ],
} as const satisfies Book
