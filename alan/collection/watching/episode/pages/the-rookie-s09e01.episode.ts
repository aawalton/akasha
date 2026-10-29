import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS09e01 = {
  id: "01a18858-0370-7aff-9a10-73ba7434b6f1",
  type: "page-type/episode",
  slug: "the-rookie-s09e01",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/the-rookie-season-9"],
  position: 1,
  publishedAt: "2027-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7708032",
      externalLink: "https://www.themoviedb.org/tv/79744/season/9/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:47:11.854Z",
  updatedAt: "2026-10-29T15:47:11.854Z",
} as const satisfies Episode
