import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e09 = {
  id: "01a183da-447a-7bfb-bcf5-ff619881b072",
  type: "page-type/episode",
  slug: "k-on-s02e09",
  description:
    "Yui struggles with exams as finals approach. To refresh after the exams, she rallies her friends to join a talent show.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 9,
  publishedAt: "2010-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879107",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/9",
    },
  ],
  title: "Finals!",
  episodeType: "standard",
  stillPath: "/uSAIW2HqXw33WPN0LVGAjQUAV9P.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
