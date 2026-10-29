import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e20 = {
  id: "01a1884b-ef73-7b5a-8248-ff817143860c",
  type: "page-type/episode",
  slug: "ncis-s12e20",
  description:
    "DiNozzo is partnered with his girlfriend ATF Special Agent Zoe Keates after evidence reveals that the murder weapon in an NCIS case was originally purchased for the controversial ATF sting operation “Operation Fast and Furious.”",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 20,
  publishedAt: "2015-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1048899",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/20",
    },
  ],
  title: "No Good Deed",
  episodeType: "standard",
  stillPath: "/mEIMiEP34bMC86dkn6xnHdbA5gx.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
