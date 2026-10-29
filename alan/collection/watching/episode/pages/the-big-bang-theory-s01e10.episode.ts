import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS01e10 = {
  id: "01a18856-3ffd-7a60-a0da-eae519872727",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s01e10",
  description:
    "Leonard and Sheldon each lie to avoid seeing Penny's concert, but Sheldon's is a bit too complicated for his own good.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-1"],
  position: 10,
  publishedAt: "2008-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64650",
      externalLink: "https://www.themoviedb.org/tv/1418/season/1/episode/10",
    },
  ],
  title: "The Loobenfeld Decay",
  episodeType: "standard",
  stillPath: "/6dssfbhNv1g3FFqKWKJhNqaqSQH.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
