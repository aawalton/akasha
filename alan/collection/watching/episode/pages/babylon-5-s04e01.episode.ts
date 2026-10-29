import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S04e01 = {
  id: "01a18843-5082-7300-88b7-08f46fbdbddb",
  type: "page-type/episode",
  slug: "babylon-5-s04e01",
  description:
    "In the aftermath of the explosion on Z'ha'dum, Sheridan is presumed dead and Garibaldi is missing. Delenn struggles to keep the alliance against the Shadows together, and Londo takes up his new position on Centauri Prime as security advisor to the emperor.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-no-surrender-no-retreat"],
  position: 1,
  publishedAt: "1996-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235877",
      externalLink: "https://www.themoviedb.org/tv/3137/season/4/episode/1",
    },
  ],
  title: "The Hour of the Wolf",
  episodeType: "standard",
  stillPath: "/fxUVilGBPrv5EVkMyxLciJYAH5m.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
