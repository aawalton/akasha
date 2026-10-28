import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS01e11 = {
  id: "01a183d6-325f-751d-8c34-a04c3108777d",
  type: "page-type/episode",
  slug: "gintama-s01e11",
  description:
    "The trio helps an old man to track down a woman whom he met when he was young. Shown as a one hour special with episode 12.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-1"],
  position: 11,
  publishedAt: "2006-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940285",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1/episode/11",
    },
  ],
  title: "Look, Overly Sticky Sweet Dumplings Are Not Real Dumplings, You Idiot!",
  episodeType: "standard",
  stillPath: "/jYbW0hC08KtfqomRiVSwVh9lpkw.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
