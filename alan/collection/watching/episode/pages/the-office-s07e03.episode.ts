import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e03 = {
  id: "01a18857-c36c-7e39-b03a-0c0afac8800d",
  type: "page-type/episode",
  slug: "the-office-s07e03",
  description:
    "Andy invites the entire office to his community theater production of Sweeney Todd in hopes that Erin will attend. Michael tries to put his jealousy aside and enjoy the performance while Jim and Pam struggle with their incompetent babysitter.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 3,
  publishedAt: "2010-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170267",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/3",
    },
  ],
  title: "Andy's Play",
  episodeType: "standard",
  stillPath: "/6dOLWVZ2A0LH8EXyNkigRw3xgLp.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
