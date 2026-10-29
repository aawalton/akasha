import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS09e04 = {
  id: "01a18885-00fe-70cd-9b84-449ecccecca6",
  type: "page-type/episode",
  slug: "studio-c-s09e04",
  description:
    "A penguin has an existential crisis, Mario wants to go back to plumbing, and is the Prince finally ready for true love's kiss?",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-9"],
  position: 4,
  publishedAt: "2018-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1577807",
      externalLink: "https://www.themoviedb.org/tv/68207/season/9/episode/4",
    },
  ],
  title: "Season 9 Episode 4",
  episodeType: "standard",
  stillPath: "/lvUX7UnHglFmb9d4tFXWbkzSqfS.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
