import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e01 = {
  id: "01a18851-3df3-71de-81dd-c864d0cd7024",
  type: "page-type/episode",
  slug: "person-of-interest-s02e01",
  description:
    "With Finch missing – kidnapped by his hacker nemesis, Root, Reese enlists Detectives Carter and Fusco to get his friend back, Meanwhile, The Machine never sleeps, disseminating a new number to Reese.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 1,
  publishedAt: "2012-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64078",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/1",
    },
  ],
  title: "The Contingency",
  episodeType: "standard",
  stillPath: "/9oiwfvn1jUX654zx3FRrv6pLu7b.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
