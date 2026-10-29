import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS05e09 = {
  id: "01a1884a-e0ed-7282-b4c7-eecc8b4f1575",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s05e09",
  description:
    "Kensi goes undercover as a nutritionist and Deeks poses as a new patient at a rehab center to investigate the death of a Navy officer.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-5"],
  position: 9,
  publishedAt: "2013-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968170",
      externalLink: "https://www.themoviedb.org/tv/17610/season/5/episode/9",
    },
  ],
  title: "Recovery",
  episodeType: "standard",
  stillPath: "/pd58OaQyhnFhz9zG6FbwQ9aZTD9.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
