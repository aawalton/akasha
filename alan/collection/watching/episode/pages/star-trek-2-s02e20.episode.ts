import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e20 = {
  id: "01a1887f-e189-77ab-a8c6-13319c0b3b2d",
  type: "page-type/episode",
  slug: "star-trek-2-s02e20",
  description:
    "Ancient alien minds are given control of Captain Kirk's and First Officer Spock's bodies.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 20,
  publishedAt: "1968-02-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14006",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/20",
    },
  ],
  title: "Return to Tomorrow",
  episodeType: "standard",
  stillPath: "/dDLMdyjzV4MvOPUPeucsJAQoM01.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
