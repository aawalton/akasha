import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e06 = {
  id: "01a183da-4479-72ba-9234-8f489215cd3f",
  type: "page-type/episode",
  slug: "k-on-s02e06",
  description:
    "On a very rainy day, Yui gets completely soaked trying to keep her guitar from getting wet. Azusa later helps Yui maintain her guitar",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 6,
  publishedAt: "2010-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879101",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/6",
    },
  ],
  title: "Rainy Season!",
  episodeType: "standard",
  stillPath: "/r2EXk9I8up4ktxOv253TNNO4ASM.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
