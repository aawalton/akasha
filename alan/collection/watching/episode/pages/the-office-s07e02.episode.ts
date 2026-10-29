import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS07e02 = {
  id: "01a18857-c36c-7249-b309-90d02f3fca2d",
  type: "page-type/episode",
  slug: "the-office-s07e02",
  description:
    "Corporate assigns Michael to counseling with Toby. Dwight vows revenge on the Steamtown Mall after a shop owner snubs him. Meanwhile, Pam conspires to change her job title.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-7"],
  position: 2,
  publishedAt: "2010-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170268",
      externalLink: "https://www.themoviedb.org/tv/2316/season/7/episode/2",
    },
  ],
  title: "Counseling",
  episodeType: "standard",
  stillPath: "/zD85V6xL5uXGTaZ3KNGy3tARzq7.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
