import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e18 = {
  id: "01a1884b-ef69-7882-856c-e28a1f43b6ed",
  type: "page-type/episode",
  slug: "ncis-s06e18",
  description:
    "The death of a boxer leads Vance to borrow the NCIS team and start investigating his death, while Gibbs digs into Vance's past.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 18,
  publishedAt: "2009-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334422",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/18",
    },
  ],
  title: "Knockout",
  episodeType: "standard",
  stillPath: "/dOsPKcExTwlKxfG2qy3QjveDluz.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
