import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e08 = {
  id: "01a18855-c29f-7ed7-a061-9051b9fb06b7",
  type: "page-type/episode",
  slug: "studio-c-s16e08",
  description:
    "Scrooge's plans are ruined. The Grinch’s heart grows. On a cold night, a man proposes on a bridge.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 8,
  publishedAt: "2022-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839041",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/8",
    },
  ],
  title: "Best Of Christmas",
  episodeType: "standard",
  stillPath: "/cNIsRo2fXRUpZIhzelXYob9YwbM.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
