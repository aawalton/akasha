import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e24 = {
  id: "01a1884a-e0eb-7299-8436-91a9fdd5e950",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e24",
  description:
    "The L.A. team is drawn into a deadly mind game against a master criminal motivated by Revenge.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 24,
  publishedAt: "2012-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557349",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/24",
    },
  ],
  title: "Sans Voir (2)",
  episodeType: "finale",
  stillPath: "/nog3HoiVtyEvOthzJjDNgAWmPtp.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
