import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e07 = {
  id: "01a1884b-ef6f-787f-b68d-e22ce19d469d",
  type: "page-type/episode",
  slug: "ncis-s10e07",
  description:
    "Gibbs continues to work with Captain Wescott while he retraces his steps in order to help the NCIS team track down a terrorist.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 7,
  publishedAt: "2012-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334677",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/7",
    },
  ],
  title: "Shell Shock (2)",
  episodeType: "standard",
  stillPath: "/r3MFQzfJsJJcc3hXm5sELaOM0xa.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
