import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e08 = {
  id: "01a1884b-ef71-7cb3-b8e9-05896b114e09",
  type: "page-type/episode",
  slug: "ncis-s11e08",
  description: "The team is forced to take another look at a hit-and-run murder case.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 8,
  publishedAt: "2013-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "966706",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/8",
    },
  ],
  title: "Alibi",
  episodeType: "standard",
  stillPath: "/nsGVI4pzGGGuV9LkhrWQLgpIYHy.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
