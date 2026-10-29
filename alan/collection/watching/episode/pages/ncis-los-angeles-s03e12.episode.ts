import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e12 = {
  id: "01a1884a-e0ea-7071-80af-16e2c40e3b03",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e12",
  description:
    "A new Assistant Director is assigned to oversee LA operations for NCIS, the team begins to wonder what his intentions really are.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 12,
  publishedAt: "2012-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557337",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/12",
    },
  ],
  title: "The Watchers",
  episodeType: "standard",
  stillPath: "/7pB2hMYr2SNqxpFO0oc7iMo7HpX.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
