import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gurrenLagannS01e01 = {
  id: "01a183db-aafd-7c19-bc41-bb95cd039838",
  type: "page-type/episode",
  slug: "gurren-lagann-s01e01",
  description:
    "Living underground in Giha Village, Simon and Kamina dream of a life on the surface. When their home is invaded from above, it is up to them to activate the mysterious mecha Lagann and save their village.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gurren-lagann-season-1"],
  position: 1,
  publishedAt: "2007-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "599461",
      externalLink: "https://www.themoviedb.org/tv/21729/season/1/episode/1",
    },
  ],
  title: "Bust Through the Heavens with Your Drill!!",
  episodeType: "standard",
  stillPath: "/aQz2qUxJEQFefudIsKJzVGuAoiW.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:52:53.885Z",
  updatedAt: "2026-10-28T18:52:53.885Z",
} as const satisfies Episode
