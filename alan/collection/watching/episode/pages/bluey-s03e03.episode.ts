import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e03 = {
  id: "01a18843-d153-7257-942d-6b303b859d5b",
  type: "page-type/episode",
  slug: "bluey-s03e03",
  description:
    "Mum sets up a backyard obstacle course just for fun, but Dad wants to race! Now the kids are determined to win by any means necessary.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 3,
  publishedAt: "2021-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3350881",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/3",
    },
  ],
  title: "Obstacle Course",
  episodeType: "standard",
  stillPath: "/zEc2CD0bu9Kwm66akDgNQeyFleF.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
