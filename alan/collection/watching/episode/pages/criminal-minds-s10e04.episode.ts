import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e04 = {
  id: "01a18844-d7f2-7ec2-aeaa-51ec554006f0",
  type: "page-type/episode",
  slug: "criminal-minds-s10e04",
  description:
    "The investigation into a series of mysterious deaths in Atlanta reveals the murders were likely committed by an UnSub with an obsessive skin disorder.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 4,
  publishedAt: "2014-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010505",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/4",
    },
  ],
  title: "The Itch",
  episodeType: "standard",
  stillPath: "/5miHdmpP8gnPHGhCdBRMUzOi6Ge.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
