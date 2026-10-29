import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e12 = {
  id: "01a18853-ddfd-7abc-a6e4-40e057d1a88e",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e12",
  description:
    "When the crew of the Ghost agrees to help two refugees who are revealed to be surviving Lasat, Zeb must come to terms with his past to help his people reach their new home.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 12,
  publishedAt: "2016-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1162960",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/12",
    },
  ],
  title: "Legends of the Lasat",
  episodeType: "standard",
  stillPath: "/A88A4CZL8hXblm9ymOxW8tt5XWp.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
