import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS02e01 = {
  id: "01a1887f-adf0-7431-809d-21fc25b99961",
  type: "page-type/episode",
  slug: "sherlock-s02e01",
  description:
    "Blackmail threatens the monarchy and Sherlock is about to meet the woman who beats him.",
  ownLength: 90,
  ownProgress: 90,
  partOfCollections: ["season/sherlock-season-2"],
  position: 1,
  publishedAt: "2012-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578720",
      externalLink: "https://www.themoviedb.org/tv/19885/season/2/episode/1",
    },
  ],
  title: "A Scandal in Belgravia",
  episodeType: "standard",
  stillPath: "/9fmNcR20uEnMeAKmUucJnCPeUJg.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
