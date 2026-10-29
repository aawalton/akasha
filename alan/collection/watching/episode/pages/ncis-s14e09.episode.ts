import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e09 = {
  id: "01a1884b-ef75-709b-aff6-9a7ba73066e5",
  type: "page-type/episode",
  slug: "ncis-s14e09",
  description:
    "The NCIS team investigates a series of escalating threats against congresswoman Jenna Flemming, while Director Vance oversees her temporary protection detail.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 9,
  publishedAt: "2016-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1244131",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/9",
    },
  ],
  title: "Pay to Play",
  episodeType: "standard",
  stillPath: "/lekPqr9BPGcBYhQ5G8EBPkxDhWJ.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
