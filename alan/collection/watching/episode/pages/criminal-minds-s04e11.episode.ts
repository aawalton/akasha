import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS04e11 = {
  id: "01a18844-d7ea-7ee2-860a-0818e595b73c",
  type: "page-type/episode",
  slug: "criminal-minds-s04e11",
  description:
    "The team investigates a serial killer who shoots luxury car owners on Southern California's freeways.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-4"],
  position: 11,
  publishedAt: "2008-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282699",
      externalLink: "https://www.themoviedb.org/tv/4057/season/4/episode/11",
    },
  ],
  title: "Normal",
  episodeType: "mid-season",
  stillPath: "/ism7tmOsDepjAeSMMCWe2ge15fj.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
