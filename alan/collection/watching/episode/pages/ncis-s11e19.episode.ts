import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e19 = {
  id: "01a1884b-ef71-78a3-b73d-3e667499f7a2",
  type: "page-type/episode",
  slug: "ncis-s11e19",
  description:
    "Gibbs and Special Agent Pride chase leads in New Orleans after evidence points to a copycat of the infamous Privileged Killer. DiNozzo, McGee, and the FBI continue to track political connections to the case from D.C.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 19,
  publishedAt: "2014-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "973558",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/19",
    },
  ],
  title: "Crescent City (2)",
  episodeType: "standard",
  stillPath: "/bLSG2Pc7w9v1PfXuiZzQGrmysiH.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
