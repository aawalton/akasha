import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS05e01 = {
  id: "01a18855-9113-7fdf-9b00-6b09dae90e0d",
  type: "page-type/episode",
  slug: "stranger-things-s05e01",
  description:
    "November, 1987. The gang evades the military to scour the Upside Down for Vecna — but fails to notice a threat lurking closer to home.",
  ownLength: 72,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-5"],
  position: 1,
  publishedAt: "2025-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5477828",
      externalLink: "https://www.themoviedb.org/tv/66732/season/5/episode/1",
    },
  ],
  title: "Chapter One: The Crawl",
  episodeType: "standard",
  stillPath: "/aOOOdhkmhncbikMVqXfVxwQ6lQw.jpg",
  voteAverage: 8.534,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
