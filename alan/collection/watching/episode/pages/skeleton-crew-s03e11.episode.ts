import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e11 = {
  id: "01a18852-196b-76a1-bd18-93cd82ef816f",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e11",
  description:
    "The first ever bear bachelor auction at MoneyShot$ is here, but the real story is happening off stage. (Part 2 of 3)",
  ownLength: 18,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 11,
  publishedAt: "2018-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4457782",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/11",
    },
  ],
  title: "Do Unto Others, Part 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
