import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS01e01 = {
  id: "01a18856-c98a-758a-836a-522ded2ec7cf",
  type: "page-type/episode",
  slug: "the-defenders-s01e01",
  description: "Dr. Bill Conrad's patient, Leona Warner, delivers a baby with Down Syndrome.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-defenders-miniseries"],
  position: 1,
  publishedAt: "1961-09-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454009",
      externalLink: "https://www.themoviedb.org/tv/11515/season/1/episode/1",
    },
  ],
  title: "Quality of Mercy",
  episodeType: "standard",
  stillPath: "/gi0ezSRuXO6TMjhFinndZLTIaLz.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
