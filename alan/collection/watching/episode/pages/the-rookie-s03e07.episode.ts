import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS03e07 = {
  id: "01a18885-4804-71f1-aba5-6c2df3503506",
  type: "page-type/episode",
  slug: "the-rookie-s03e07",
  description:
    "The team gets the true crime docuseries treatment when they analyze a recent case featuring a former child actor whose adult life has garnered him a cult following.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-3"],
  position: 7,
  publishedAt: "2021-02-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2757495",
      externalLink: "https://www.themoviedb.org/tv/79744/season/3/episode/7",
    },
  ],
  title: "True Crime",
  episodeType: "mid-season",
  stillPath: "/6J4UTvKrPpEC9CSJP8vUKdNpK4o.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
