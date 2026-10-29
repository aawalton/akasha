import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e23 = {
  id: "01a1884b-3016-73ff-a842-cd89cf13f209",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e23",
  description:
    "Pride suspects a mole among the ranks as NCIS and local law enforcement continue to track the Broussard Syndicate after new intelligence suggests a breach at the ports.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 23,
  publishedAt: "2015-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1054899",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/23",
    },
  ],
  title: "My City",
  episodeType: "finale",
  stillPath: "/hTBzjnKwamBdU13ChDcGE847EHq.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
