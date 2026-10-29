import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS19e10 = {
  id: "01a18844-d7fb-7138-8f45-59af9935115c",
  type: "page-type/episode",
  slug: "criminal-minds-s19e10",
  description:
    "The Fan's twisted past and the ultimate showdown will be revealed in the climactic finale to Season Nineteen.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-19"],
  position: 10,
  publishedAt: "2026-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7166554",
      externalLink: "https://www.themoviedb.org/tv/4057/season/19/episode/10",
    },
  ],
  title: "Bad Blood",
  episodeType: "finale",
  stillPath: "/eSbmOraqOcp0ElBeNWlAX6YpF07.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
