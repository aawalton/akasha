import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS02e01 = {
  id: "01a183d8-4892-7a32-b6ba-bf3fc98e5cee",
  type: "page-type/episode",
  slug: "sailor-moon-s02e01",
  description:
    "Two mysterious aliens show up in town and Luna and Artemis restore Usagi's memories of being Sailor Moon",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-2"],
  position: 1,
  publishedAt: "1993-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992343",
      externalLink: "https://www.themoviedb.org/tv/3570/season/2/episode/1",
    },
  ],
  title: "The Return of Sailor Moon",
  episodeType: "standard",
  stillPath: "/jprZESMuweRjjilcAiVuenS7lRk.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
