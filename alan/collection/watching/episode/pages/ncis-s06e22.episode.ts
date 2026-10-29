import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e22 = {
  id: "01a1884b-ef69-7a4a-98fc-4e2844a91f02",
  type: "page-type/episode",
  slug: "ncis-s06e22",
  description:
    "The body of a Marine leads Gibbs and McGee to the NCIS OSP division in Los Angeles, where a murder investigation quickly climbs to a matter of national security.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 22,
  publishedAt: "2009-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334426",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/22",
    },
  ],
  title: "Legend (1)",
  episodeType: "standard",
  stillPath: "/qgp0qxHGH55FRv31SMcQgXReAG2.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
