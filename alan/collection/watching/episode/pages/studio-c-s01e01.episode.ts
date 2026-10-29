import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS01e01 = {
  id: "01a18885-00f8-796b-8d33-0df3a7fb61ea",
  type: "page-type/episode",
  slug: "studio-c-s01e01",
  description:
    "Mallory finds love at a Halloween dance, Matt shares some doorstep dating insight with Mallory, and Jason expresses his feelings about Rhode Island.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-1"],
  position: 1,
  publishedAt: "2012-10-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378616",
      externalLink: "https://www.themoviedb.org/tv/68207/season/1/episode/1",
    },
  ],
  title: "Season 1 Episode 1",
  episodeType: "standard",
  stillPath: "/p8SLyJZTPxU3LFMTr8U0rcpib0c.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
