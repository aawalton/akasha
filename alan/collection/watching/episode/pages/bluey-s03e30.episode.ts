import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e30 = {
  id: "01a18843-d155-7909-9fe2-02f8c7430d03",
  type: "page-type/episode",
  slug: "bluey-s03e30",
  description:
    "Bingo finds a toy turtle at the playground and wants to take him home, but Dad says it's not the done thing.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 30,
  publishedAt: "2022-06-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3781862",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/30",
    },
  ],
  title: "Turtleboy",
  episodeType: "standard",
  stillPath: "/dZ45QAFwd7neUJbCaRyktIYawXq.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
