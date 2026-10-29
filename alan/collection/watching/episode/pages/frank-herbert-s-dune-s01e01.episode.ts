import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const frankHerbertSDuneS01e01 = {
  id: "01a18848-6a9c-7cb6-bbfa-230205f24c02",
  type: "page-type/episode",
  slug: "frank-herbert-s-dune-s01e01",
  description:
    "On the emperor's order, Duke Leto Atreides moves from his home planet, Caladan, with his family to lead the planet Arrakis, also known as Dune. After an attack on their stronghold, his son, Paul, and his wife, Lady Jessica, flee into the desert.",
  ownLength: 95,
  ownProgress: 0,
  partOfCollections: ["season/frank-herbert-s-dune-miniseries"],
  position: 1,
  publishedAt: "2000-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "575979",
      externalLink: "https://www.themoviedb.org/tv/19566/season/1/episode/1",
    },
  ],
  title: "Dune",
  episodeType: "standard",
  stillPath: "/uoUS9PGgyGktDrDEnwbl9eM1LIq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:30:09.692Z",
  updatedAt: "2026-10-29T15:30:09.692Z",
} as const satisfies Episode
