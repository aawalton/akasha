import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e10 = {
  id: "01a18852-196b-738c-bfd3-b14997993993",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e10",
  description:
    "The first ever bear bachelor auction at MoneyShot$ is here, but the real story is happening off stage. (Part 1 of 3)",
  ownLength: 17,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 10,
  publishedAt: "2018-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380499",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/10",
    },
  ],
  title: "Do Unto Others, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
