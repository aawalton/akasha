import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e15 = {
  id: "01a18853-f9af-7f6a-99f4-6b422095a913",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e15",
  description:
    "When Kel and Eila seek out Kaz’s help after knocking out a stormtrooper, Kaz dons the trooper’s armor to protect the kids and spy on the First Order.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 15,
  publishedAt: "2019-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1703066",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/15",
    },
  ],
  title: "The New Trooper",
  episodeType: "standard",
  stillPath: "/je1ZuU1XAeNpi96zChNQR5TJ2wi.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
