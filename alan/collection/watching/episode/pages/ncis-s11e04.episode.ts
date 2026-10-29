import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e04 = {
  id: "01a1884b-ef70-7ee2-9adc-619d47ca15b0",
  type: "page-type/episode",
  slug: "ncis-s11e04",
  description:
    "Gibbs and McGee travel to Afghanistan when a murder case leads them to an Afghan women’s shelter that Mike Frank secretly supported for years.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 4,
  publishedAt: "2013-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334699",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/4",
    },
  ],
  title: "Anonymous Was a Woman",
  episodeType: "standard",
  stillPath: "/ao6rVlJMj5ulGRs0sNmVWoWZnQr.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
