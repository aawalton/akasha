import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whenCallsTheHeartS08e02 = {
  id: "01a18859-d1bd-7216-ae83-6c339fbb156b",
  type: "page-type/episode",
  slug: "when-calls-the-heart-s08e02",
  description:
    "The arrival of Lucas' mother makes Elizabeth more than a little nervous; Lee injures his back.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/when-calls-the-heart-season-8"],
  position: 2,
  publishedAt: "2021-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2709620",
      externalLink: "https://www.themoviedb.org/tv/61865/season/8/episode/2",
    },
  ],
  title: "Honestly, Elizabeth",
  episodeType: "standard",
  stillPath: "/gwGmpXln24FjgD64VrbN6uVIXNG.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:49:10.201Z",
  updatedAt: "2026-10-29T15:49:10.201Z",
} as const satisfies Episode
