import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e12 = {
  id: "01a18848-c2b9-73b0-8045-07ba546ea4d5",
  type: "page-type/episode",
  slug: "friends-s01e12",
  description:
    "Everyone knows the sex of Ross's baby, except for Ross, who doesn't want to find out until it's born. Monica gives Paolo one of the dozen lasagnas she made for her aunt, who doesn't want them anymore because they've got meat in them.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 12,
  publishedAt: "1995-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86090",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/12",
    },
  ],
  title: "The One with the Dozen Lasagnas",
  episodeType: "standard",
  stillPath: "/aEzWo1HvNG8yD0eLEB5E2wlpAQc.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
