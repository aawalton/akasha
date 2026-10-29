import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const providenceFallsS01e01 = {
  id: "01a18851-5086-7c31-908a-5dd98d027635",
  type: "page-type/episode",
  slug: "providence-falls-s01e01",
  description:
    "In 1844 Ireland, a rogue falls for a squire's daughter, altering her destiny. Angels send them to present-day Providence Falls to correct it. He must make her fall for another man, though she's now a cop with no memory of their past lives.",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["season/providence-falls-season-1"],
  position: 1,
  publishedAt: "2025-08-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6431416",
      externalLink: "https://www.themoviedb.org/tv/297638/season/1/episode/1",
    },
  ],
  title: "Chance of a Lifetime",
  episodeType: "standard",
  stillPath: "/m5i8WGZQVnFVflEjtGGBOJ0CrVg.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:39:52.838Z",
  updatedAt: "2026-10-29T15:39:52.838Z",
} as const satisfies Episode
