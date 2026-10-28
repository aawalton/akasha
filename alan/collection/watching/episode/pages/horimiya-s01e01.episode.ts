import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const horimiyaS01e01 = {
  id: "01a183d8-71ab-7ee0-bbc2-bbf2edd96701",
  type: "page-type/episode",
  slug: "horimiya-s01e01",
  description:
    "Hori-san lives a double life: trendy, popular girl at school, simple, strong-willed caretaker at home. After a chance encounter with her classmate Miyamura, she finds out that she’s not the only one who hides her true self away.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/horimiya-season-1"],
  position: 1,
  publishedAt: "2021-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2429820",
      externalLink: "https://www.themoviedb.org/tv/110070/season/1/episode/1",
    },
  ],
  title: "A Tiny Happenstance",
  episodeType: "standard",
  stillPath: "/cQj59g8z7qsRHGNgRXCQgPj75eu.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:49:22.603Z",
  updatedAt: "2026-10-28T18:49:22.603Z",
} as const satisfies Episode
