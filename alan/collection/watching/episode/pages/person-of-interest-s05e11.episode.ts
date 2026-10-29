import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS05e11 = {
  id: "01a18851-3df8-78a4-8cc8-583e3efd065e",
  type: "page-type/episode",
  slug: "person-of-interest-s05e11",
  description:
    "The team must unravel a conspiracy and stay ahead of the Secret Service when the President of the United States becomes their newest POI. Also, Finch separates himself from the team and considers taking drastic action to combat Samaritan.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-5"],
  position: 11,
  publishedAt: "2016-06-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176507",
      externalLink: "https://www.themoviedb.org/tv/1411/season/5/episode/11",
    },
  ],
  title: "Synecdoche",
  episodeType: "standard",
  stillPath: "/9GPaklP2RAYQHM7MpByEP9jn8Ip.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
