import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS02e14 = {
  id: "01a1884a-e0e9-7c23-bd08-e7451eb26668",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s02e14",
  description:
    "Sam goes undercover as a prisoner to track down a terrorist group responsible for several bombings around the world.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-2"],
  position: 14,
  publishedAt: "2011-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557309",
      externalLink: "https://www.themoviedb.org/tv/17610/season/2/episode/14",
    },
  ],
  title: "Lockup",
  episodeType: "standard",
  stillPath: "/A60OSt5lYIyaBKYMAJA3jVKXQn2.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
