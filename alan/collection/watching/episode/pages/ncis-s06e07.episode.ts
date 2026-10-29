import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e07 = {
  id: "01a1884b-ef68-713e-8470-1c5b6cad1a81",
  type: "page-type/episode",
  slug: "ncis-s06e07",
  description:
    "A Navy bank has been robbed and NCIS is responsible for the investigation. One of the new recruits assigned to the fraud unit, Special Agent Dwayne Wilson, joins the team to help.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 7,
  publishedAt: "2008-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334411",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/7",
    },
  ],
  title: "Collateral Damage",
  episodeType: "standard",
  stillPath: "/1jOSrsVdmzO66BShFBGw93t79yG.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
