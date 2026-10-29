import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e16 = {
  id: "01a18848-c2bc-7364-93fc-e17453034126",
  type: "page-type/episode",
  slug: "friends-s03e16",
  description:
    "Ross tries to prevent Rachel from learning his disturbing secret. She finds out anyway and they go back to her apartment to have a fight. The other four friends are trapped in Monica's bedroom, forced to listen in.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 16,
  publishedAt: "1997-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86304",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/16",
    },
  ],
  title: "The One with the Morning After",
  episodeType: "standard",
  stillPath: "/5rM97ao2TZZMHUrfsnP1XCOh1Jx.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
