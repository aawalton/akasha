import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e10 = {
  id: "01a1884a-e0ea-7282-92dc-98b4d259361c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e10",
  description:
    "A botched assignment forces Hetty to fire Deeks and send him back to the LAPD. Meanwhile, an awkward goodbye between Kensi and Deeks leaves her with unexpected emotions for her old partner",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 10,
  publishedAt: "2011-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557336",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/10",
    },
  ],
  title: "The Debt",
  episodeType: "standard",
  stillPath: "/vvNSQv86jIinwIkgGaFnV5QRN8s.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
