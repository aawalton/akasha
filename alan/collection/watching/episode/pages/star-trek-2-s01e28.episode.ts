import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e28 = {
  id: "01a1887f-e187-7f33-9bc1-3644bb25b043",
  type: "page-type/episode",
  slug: "star-trek-2-s01e28",
  description:
    "Kirk and Spock must travel into the past in order to correct a change that will alter history.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 28,
  publishedAt: "1967-04-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13981",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/28",
    },
  ],
  title: "The City on the Edge of Forever",
  episodeType: "standard",
  stillPath: "/snEWpROgiz1lh2RXpaPjGlcmpsR.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
