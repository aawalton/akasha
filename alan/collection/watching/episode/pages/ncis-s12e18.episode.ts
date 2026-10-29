import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e18 = {
  id: "01a1884b-ef72-71e9-98f8-d969857fe975",
  type: "page-type/episode",
  slug: "ncis-s12e18",
  description:
    "After the body of a thief is found in a Marine’s house, NCIS discovers the calling card of a terror group Delilah and the Department of Defense have been tracking.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 18,
  publishedAt: "2015-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1047226",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/18",
    },
  ],
  title: "Status Update",
  episodeType: "standard",
  stillPath: "/1dVXUjILRiz68Y87MwZNCnSq4j3.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
