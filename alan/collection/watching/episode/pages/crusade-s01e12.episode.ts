import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const crusadeS01e12 = {
  id: "01a18845-c75e-7c61-8c88-882cc9816024",
  type: "page-type/episode",
  slug: "crusade-s01e12",
  description:
    "Two persecuted alien investigators (based on FBI agents Mulder and Scully from X-Files) believe that Earth is covertly invading them.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/crusade-season-1"],
  position: 12,
  publishedAt: "1999-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "147560",
      externalLink: "https://www.themoviedb.org/tv/2120/season/1/episode/12",
    },
  ],
  title: "Visitors from Down the Street",
  episodeType: "standard",
  stillPath: "/5rYOfRTppZYMiFZoWuadFs7yPTw.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:27:16.829Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Episode
