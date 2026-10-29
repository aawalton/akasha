import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e12 = {
  id: "01a18852-196b-753f-96e0-5254cb8790f6",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e12",
  description:
    "The first ever bear bachelor auction at MoneyShot$ is here, but the real story is happening off stage. (Part 3 of 3)",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 12,
  publishedAt: "2018-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4457786",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/12",
    },
  ],
  title: "Do Unto Others, Part 3",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
