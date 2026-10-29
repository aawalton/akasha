import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e12 = {
  id: "01a1884a-e0f3-7443-822a-8e41d3bce15f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e12",
  description:
    "After the chief of logistics for a naval weapons station collapses on the job, the NCIS team must determine if this is a terror threat or a stress-induced breakdown. Also, Kensi and Deeks research different honeymoon locations.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 12,
  publishedAt: "2019-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1639153",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/12",
    },
  ],
  title: "The Sound of Silence",
  episodeType: "standard",
  stillPath: "/lKZXRiuMTg34Sy7835wMyEEIgiq.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
