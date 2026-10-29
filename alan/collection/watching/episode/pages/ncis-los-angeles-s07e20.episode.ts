import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e20 = {
  id: "01a1884a-e0f0-7d02-a974-a69a07456e5a",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e20",
  description:
    "While assigned to protective details for the commander of the Pacific Command, the team searches for a North Korean spy.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 20,
  publishedAt: "2016-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180050",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/20",
    },
  ],
  title: "Seoul Man",
  episodeType: "standard",
  stillPath: "/aaKF57LPauuyFDzraFIuT345LLS.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
