import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e08 = {
  id: "01a1884a-e0ee-71f6-944c-fce8f053ccb3",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e08",
  description:
    "After Deeks and Kensi work under cover to investigate the murder of a homeless man they discover a connection to a Mexican cartel.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 8,
  publishedAt: "2014-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1016540",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/8",
    },
  ],
  title: "The Grey Man",
  episodeType: "standard",
  stillPath: "/bL9eaGdky0gKSKoalLSSVltaqRf.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
