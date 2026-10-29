import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS10e01 = {
  id: "01a18848-c2c7-76dd-be74-b4616f1df9f8",
  type: "page-type/episode",
  slug: "friends-s10e01",
  description:
    "After leaving Barbados, Joey and Ross both attempt to come clean to each other that they're dating Rachel and Charlie, however, various obstacles constantly get in their way. Meanwhile, Monica gets a new haircut much to Chandler's dismay and Phoebe finds out that Mike has another girlfriend.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-10"],
  position: 1,
  publishedAt: "2003-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87523",
      externalLink: "https://www.themoviedb.org/tv/1668/season/10/episode/1",
    },
  ],
  title: "The One After Joey and Rachel Kiss",
  episodeType: "standard",
  stillPath: "/eo4ySedQXdpKoB2cRshDA9UEbLO.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
