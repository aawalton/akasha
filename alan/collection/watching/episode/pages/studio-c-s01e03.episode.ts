import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS01e03 = {
  id: "01a18885-00f8-729c-b300-6adb2e912d67",
  type: "page-type/episode",
  slug: "studio-c-s01e03",
  description:
    "Mallory tells two truths, Whitney goes on a blind date, and Jason makes a new friend at the family BBQ.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-1"],
  position: 3,
  publishedAt: "2012-10-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378618",
      externalLink: "https://www.themoviedb.org/tv/68207/season/1/episode/3",
    },
  ],
  title: "Season 1 Episode 3",
  episodeType: "standard",
  stillPath: "/xUrad7VC36qx3E6HdXDaDWu9YcR.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
