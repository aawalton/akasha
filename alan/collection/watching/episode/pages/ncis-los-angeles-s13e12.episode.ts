import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS13e12 = {
  id: "01a1884a-e0f6-7ec1-8d31-d957f0b94dd1",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s13e12",
  description:
    "The NCIS team investigates an unidentified aircraft that flies into U.S. airspace and crashes into a Navy plane. Also, Deeks and Kensi begin to prepare for their foster inspection.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-13"],
  position: 12,
  publishedAt: "2022-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3530650",
      externalLink: "https://www.themoviedb.org/tv/17610/season/13/episode/12",
    },
  ],
  title: "Murmuration",
  episodeType: "standard",
  stillPath: "/uz9SpRlipkAQ8mVBFPhAJvHRKu5.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
