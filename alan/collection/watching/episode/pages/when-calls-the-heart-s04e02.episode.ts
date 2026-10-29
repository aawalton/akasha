import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whenCallsTheHeartS04e02 = {
  id: "01a18859-d1bb-7f46-ba66-34317ce9bb0e",
  type: "page-type/episode",
  slug: "when-calls-the-heart-s04e02",
  description:
    "Elizabeth must coax the truth from Robert after he tells a lie about seeing a bear and becomes the town hero.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/when-calls-the-heart-season-4"],
  position: 2,
  publishedAt: "2017-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1273156",
      externalLink: "https://www.themoviedb.org/tv/61865/season/4/episode/2",
    },
  ],
  title: "Heart of Truth",
  episodeType: "standard",
  stillPath: "/4hfT7t3CbnQEWuVJYZgQWd3jms9.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:49:10.201Z",
  updatedAt: "2026-10-29T15:49:10.201Z",
} as const satisfies Episode
