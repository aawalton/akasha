import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const nanaS01e14 = {
  id: "01a183d5-6777-7c05-9b39-3a05d6f1451b",
  type: "page-type/episode",
  slug: "nana-s01e14",
  description:
    'Nana and Hachi confront Shoji and Sachiko over their relationship. Later, Hachi receives tickets to see "Trapnest" that she ordered in the past.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/nana-season-1"],
  position: 14,
  publishedAt: "2006-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "939450",
      externalLink: "https://www.themoviedb.org/tv/56568/season/1/episode/14",
    },
  ],
  title: "Family Restaurant of Shambles",
  episodeType: "standard",
  stillPath: "/u02zbrvTenSUQ1NaOE2IDlUllIy.jpg",
  voteAverage: 6,
  createdAt: "2026-10-28T18:46:03.381Z",
  updatedAt: "2026-10-28T18:46:03.381Z",
} as const satisfies Episode
