import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS01e02 = {
  id: "01a1887f-56d1-774f-b9d7-7be89d2ce745",
  type: "page-type/episode",
  slug: "scorpion-s01e02",
  description:
    'The governor calls on Team Scorpion when his daughter is mysteriously "bio-hacked" with a deadly virus and only has 24 hours to live. The case takes on a deeper significance for Walter after he receives a letter regarding his sister.',
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/scorpion-season-1"],
  position: 2,
  publishedAt: "2014-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1009084",
      externalLink: "https://www.themoviedb.org/tv/60797/season/1/episode/2",
    },
  ],
  title: "Single Point of Failure",
  episodeType: "standard",
  stillPath: "/xURjz7w4dmANzfxzkyFmeXDdxEI.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
