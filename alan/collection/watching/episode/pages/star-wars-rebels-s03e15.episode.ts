import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e15 = {
  id: "01a18853-ddfe-7584-bb8a-b9c371f6632f",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e15",
  description:
    "Hoping to get her family to help the rebels, Sabine returns home with Kanan and Ezra, and finds herself embroiled in her family's power struggle for Mandalore.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 15,
  publishedAt: "2017-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1258930",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/15",
    },
  ],
  title: "Legacy of Mandalore",
  episodeType: "standard",
  stillPath: "/wl0o3dgpXOnMpiLn3YvX2Rx7uyH.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
