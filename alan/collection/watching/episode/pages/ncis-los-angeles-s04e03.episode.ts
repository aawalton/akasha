import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e03 = {
  id: "01a1884a-e0eb-7f15-8f4e-f0f621ca4f5e",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e03",
  description:
    "The NCIS: LA team investigate a compromised intel operation after four people connected to the classified project are killed at a diner explosion. As Deeks and Kensi are on the trail of those involved, they learn that a wayward teenage girl might be related and Kensi can’t help but be empathetic to her situation.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 3,
  publishedAt: "2012-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557352",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/3",
    },
  ],
  title: "The Fifth Man",
  episodeType: "standard",
  stillPath: "/loLEi8J2ygMJ12vdIS7coZFhCA4.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
