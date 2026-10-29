import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e10 = {
  id: "01a1887e-62a6-7c56-a447-cf3a2df345c1",
  type: "page-type/episode",
  slug: "elementary-s01e10",
  description:
    "Sherlock is called in to investigate when a supposedly uncrackable bank vault called “The Leviathan” is breached. Meanwhile, Joan is pleasantly surprised when Sherlock meets her family and defends her choice to become a sober companion.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 10,
  publishedAt: "2012-12-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64294",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/10",
    },
  ],
  title: "The Leviathan",
  episodeType: "mid-season",
  stillPath: "/bpx29i8wwqsQvECiCBJ3lhKrvoG.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
