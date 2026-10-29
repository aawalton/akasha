import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS02e03 = {
  id: "01a1887f-adf0-78c3-a1c2-b540d6d86f5c",
  type: "page-type/episode",
  slug: "sherlock-s02e03",
  description: "The return of Moriarty. The crime of the century. Can Sherlock possibly survive?",
  ownLength: 89,
  ownProgress: 89,
  partOfCollections: ["season/sherlock-season-2"],
  position: 3,
  publishedAt: "2012-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578718",
      externalLink: "https://www.themoviedb.org/tv/19885/season/2/episode/3",
    },
  ],
  title: "The Reichenbach Fall",
  episodeType: "finale",
  stillPath: "/PVxRD2JqT2QM4t1Cih0v2AoRSR.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
