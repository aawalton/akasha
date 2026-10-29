import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS03e14 = {
  id: "01a18856-4000-77a4-be27-c4fc8efaa4ff",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s03e14",
  description:
    "Sheldon's search for the answer to a physics problem leads him to work at the Cheesecake Factory with Penny.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-3"],
  position: 14,
  publishedAt: "2010-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64686",
      externalLink: "https://www.themoviedb.org/tv/1418/season/3/episode/14",
    },
  ],
  title: "The Einstein Approximation",
  episodeType: "standard",
  stillPath: "/7tx6fSRlOn6r5HXVOzOjilaqeZI.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
