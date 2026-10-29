import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e15 = {
  id: "01a1884b-ef6e-7cc4-992b-27e6b43958c6",
  type: "page-type/episode",
  slug: "ncis-s09e15",
  description:
    "When a Navy Captain is found dead with an unusual costume hidden under his uniform, NCIS uncovers a secret society of real-life super heroes and must track down the villain.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 15,
  publishedAt: "2012-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334606",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/15",
    },
  ],
  title: "Secrets",
  episodeType: "standard",
  stillPath: "/pVcJ0g65EuaSqV9bz149M5409ef.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
