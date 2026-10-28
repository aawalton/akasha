import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e18 = {
  id: "01a183d1-bb4b-7c12-87be-83f8b58b9e50",
  type: "page-type/episode",
  slug: "naruto-s01e18",
  description:
    "Kakashi prepares to stop Zabuza once and for all, but Haku has other plans. Zabuza's employer shows up and he's decided to take matters into his own hands...",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 18,
  publishedAt: "2003-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908143",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/18",
    },
  ],
  title: "The Weapons Known as Shinobi",
  episodeType: "standard",
  stillPath: "/fWq5VAWWX2PQ8dZUFvmN8w095tb.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
