import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e09 = {
  id: "01a18857-c36f-78c2-b14f-ad4ad0fc9da0",
  type: "page-type/episode",
  slug: "the-office-s09e09",
  description:
    "When the party planning committee drops the ball on the annual Christmas party, Dwight gets everyone to celebrate with a traditional Schrute German Christmas. Darryl fears that Jim has forgotten to include him in the new job in Philadelphia. Pete teaches Erin about his favorite movie, Die Hard.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 9,
  publishedAt: "2012-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170322",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/9",
    },
  ],
  title: "Dwight Christmas",
  episodeType: "mid-season",
  stillPath: "/2Mf0l59K2OQ0I7q1oR06cIqo5zT.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
