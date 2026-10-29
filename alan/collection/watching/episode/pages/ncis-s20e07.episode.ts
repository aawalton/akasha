import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e07 = {
  id: "01a1884b-ef81-7f06-8251-358d6ab4b81d",
  type: "page-type/episode",
  slug: "ncis-s20e07",
  description:
    "NCIS must investigate the Secretary of the Navy when her husband claims she tried to murder him.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 7,
  publishedAt: "2022-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4020294",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/7",
    },
  ],
  title: "Love Lost",
  episodeType: "standard",
  stillPath: "/j32HUQ0lh5tUVRa4NWOXi4YtQoV.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
