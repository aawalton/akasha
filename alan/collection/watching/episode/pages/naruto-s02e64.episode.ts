import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS02e64 = {
  id: "01a183d1-bb4f-702a-9b24-13139a4a475e",
  type: "page-type/episode",
  slug: "naruto-s02e64",
  description:
    "Shikamaru takes on Temari, only he doesn't want to fight. Can the lazy Shikamaru even last the round? Or is there more to Shikamaru than meets the eye?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-2"],
  position: 64,
  publishedAt: "2003-12-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "959698",
      externalLink: "https://www.themoviedb.org/tv/46260/season/2/episode/64",
    },
  ],
  title: "Zero Motivation: The Guy with Cloud Envy!",
  episodeType: "standard",
  stillPath: "/m7p7qrHqu81pu4Qz1fccWpc1UZU.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
