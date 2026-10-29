import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e24 = {
  id: "01a1884b-ef69-72ff-8478-2ae6dc700c20",
  type: "page-type/episode",
  slug: "ncis-s06e24",
  description:
    "After a security breach at the SecNav's residence leads to the death of an ICE agent, Gibbs and the team are forced to work with ICE and the FBI to find his killer.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 24,
  publishedAt: "2009-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334427",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/24",
    },
  ],
  title: "Semper Fidelis",
  episodeType: "standard",
  stillPath: "/1JzTCDztESlulLFbIzXdA3c0pTE.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
