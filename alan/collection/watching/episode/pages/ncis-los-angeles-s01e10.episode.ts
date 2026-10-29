import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e10 = {
  id: "01a1884a-e0e8-7fb3-b689-ee4f139067ad",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e10",
  description:
    "As the courtyard is being transformed with holiday decorations, the NCIS team races to solve the murder of a Marine by an exploding cell phone and to find the remaining men of his former EOD (explosive ordnance disposal) unit before another deadly explosion kills someone else.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 10,
  publishedAt: "2009-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557283",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/10",
    },
  ],
  title: "Brimstone",
  episodeType: "standard",
  stillPath: "/9TiKvW4iPWWm4hyGawNu9OdQ9W3.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
