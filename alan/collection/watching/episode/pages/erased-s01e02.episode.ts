import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const erasedS01e02 = {
  id: "01a183d8-0f20-70c8-9b02-d07c54f7a65d",
  type: "page-type/episode",
  slug: "erased-s01e02",
  description:
    "The year is 1988… Satoru is back in elementary school. Now, he has a chance to change the future!",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/erased-season-1"],
  position: 2,
  publishedAt: "2016-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1157432",
      externalLink: "https://www.themoviedb.org/tv/65249/season/1/episode/2",
    },
  ],
  title: "Palm of the Hand",
  episodeType: "standard",
  stillPath: "/4onDQglp8pYTpcUeHyfCrLWMb0c.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:48:57.376Z",
  updatedAt: "2026-10-28T18:48:57.376Z",
} as const satisfies Episode
