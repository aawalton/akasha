import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const parksAndRecreationS01e01 = {
  id: "01a18850-f8b9-7555-8ad2-f1d53202efb3",
  type: "page-type/episode",
  slug: "parks-and-recreation-s01e01",
  description:
    "Indiana government worker Leslie Knope is given the assignment to convert an abandoned quarry pit into a community park. A documentary film crew follows Leslie through her mishaps and gaffes as she tries to make her assignment a reality.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/parks-and-recreation-season-1"],
  position: 1,
  publishedAt: "2009-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "397621",
      externalLink: "https://www.themoviedb.org/tv/8592/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/xeI3nBESPQ7l5lZ9R647tXs4OgG.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:39:30.361Z",
  updatedAt: "2026-10-29T15:39:30.361Z",
} as const satisfies Episode
