import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e08 = {
  id: "01a18885-00f9-70ba-9e80-ba390b2e5dfb",
  type: "page-type/episode",
  slug: "studio-c-s02e08",
  description:
    "Matt's stand-up routine is interrupted, eating bisque for lunch is harder than it should be, and Sidious is determined to bring his roommates to the dark side.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 8,
  publishedAt: "2013-05-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383575",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/8",
    },
  ],
  title: "Season 2 Episode 8",
  episodeType: "standard",
  stillPath: "/6nXQI2KdrdH8fDUZB21aVy4JOhs.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
