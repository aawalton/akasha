import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eyesOfWakandaS01e01 = {
  id: "01a18848-4d88-7ecf-87b0-c4a3e909dc07",
  type: "page-type/episode",
  slug: "eyes-of-wakanda-s01e01",
  description:
    "A former member of the Dora Milaje is sent to take down a rogue Wakandan known as The Lion.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/eyes-of-wakanda-miniseries"],
  position: 1,
  publishedAt: "2025-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4991859",
      externalLink: "https://www.themoviedb.org/tv/241388/season/1/episode/1",
    },
  ],
  title: "Into the Lion's Den",
  episodeType: "standard",
  stillPath: "/7Ex7F84z8fiJKC8X1juNYX3z1oM.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:30:02.248Z",
  updatedAt: "2026-10-29T15:30:02.248Z",
} as const satisfies Episode
