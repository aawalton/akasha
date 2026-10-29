import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e12 = {
  id: "01a18852-a9f7-751b-bf8d-e3dc16d574e6",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e12",
  description:
    "After capturing the U.S.S. Discovery, Osyraa seeks a meeting with Admiral Vance while Burnham and the crew must overcome unimaginable odds as they attempt to regain command of their ship.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 12,
  publishedAt: "2020-12-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2465804",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/12",
    },
  ],
  title: "There is a Tide…",
  episodeType: "standard",
  stillPath: "/9YbzeEQkjIkEXeRoazPScvaJ4GD.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
