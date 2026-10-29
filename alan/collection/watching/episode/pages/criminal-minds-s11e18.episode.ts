import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS11e18 = {
  id: "01a18844-d7f5-7329-844f-86bd2bc360e6",
  type: "page-type/episode",
  slug: "criminal-minds-s11e18",
  description:
    "When an UnSub targets the BAU, and the team goes into action to find out who is responsible.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-11"],
  position: 18,
  publishedAt: "2016-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166285",
      externalLink: "https://www.themoviedb.org/tv/4057/season/11/episode/18",
    },
  ],
  title: "A Beautiful Disaster",
  episodeType: "standard",
  stillPath: "/3J1gHCHb5ocqMZQQ7SyS3uol662.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
