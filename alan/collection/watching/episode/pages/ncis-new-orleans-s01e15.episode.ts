import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e15 = {
  id: "01a1884b-3015-7ea0-97a8-30b14a1683ae",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e15",
  description:
    "A Petty Officer is murdered during Mardi Gras festivities. Pride contemplates what to tell his daughter about his strained relationship with his father.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 15,
  publishedAt: "2015-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1041683",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/15",
    },
  ],
  title: "Le Carnaval de la Mort",
  episodeType: "standard",
  stillPath: "/mOvSnnmO40tpUnLizdfMrCGSGsS.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
