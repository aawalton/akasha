import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e13 = {
  id: "01a18851-3df4-770e-bddd-f8b80547a36f",
  type: "page-type/episode",
  slug: "person-of-interest-s02e13",
  description:
    "Reese is abducted by a former acquaintance planning a massive and potentially deadly act of cyber-warfare.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 13,
  publishedAt: "2013-01-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64090",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/13",
    },
  ],
  title: "Dead Reckoning",
  episodeType: "standard",
  stillPath: "/delGJiGicbtrg33qw8esUD3w1eI.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
