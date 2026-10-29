import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e16 = {
  id: "01a18853-ddff-74c4-9163-39bfd5371141",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e16",
  description:
    "Ezra and the Ghost crew look to complete their ultimate mission: to liberate Lothal from the clutches of the Empire.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 16,
  publishedAt: "2018-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1952809",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/16",
    },
  ],
  title: "Family Reunion - and Farewell (2)",
  episodeType: "finale",
  stillPath: "/qH5jfUdhlQwaCV6fm9yz87SxKNe.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
