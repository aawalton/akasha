import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e07 = {
  id: "01a18848-c2bb-70f7-bc65-8ba0d94f8f21",
  type: "page-type/episode",
  slug: "friends-s03e07",
  description:
    "Monica buys a new bed from Janice's soon-to-be-ex-husband, \"The Mattress King\", but the wrong one is delivered.  Rachel's attempts to have her father and Ross bond fail, until she stops trying. Joey gets a job teaching a soap opera acting class.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 7,
  publishedAt: "1996-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86292",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/7",
    },
  ],
  title: "The One with the Race Car Bed",
  episodeType: "standard",
  stillPath: "/gCUk2Mytau5IX7oEndRnwtzThOT.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
