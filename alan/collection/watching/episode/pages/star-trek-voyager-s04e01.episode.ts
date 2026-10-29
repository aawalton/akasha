import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e01 = {
  id: "01a18853-ac8d-71a9-9393-02121247fa14",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e01",
  description:
    "Stardate: 51003.7. The Voyager crew, allied with the Borg, prepare to battle the sinister alien Species 8472. But can an alliance between opinionated individuals and a collective race of consumers survive such fundamental differences?",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 1,
  publishedAt: "1997-09-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113194",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/1",
    },
  ],
  title: "Scorpion (2)",
  episodeType: "standard",
  stillPath: "/xQafP3sSBBVYUV15CbY7vIJCxtQ.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
