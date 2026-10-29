import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e20 = {
  id: "01a1884b-ef69-7ad8-95e7-f4750ca70875",
  type: "page-type/episode",
  slug: "ncis-s06e20",
  description:
    "Gibbs and the team must work with the shady Trent Kort to put away one of NCIS's most wanted.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 20,
  publishedAt: "2009-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334424",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/20",
    },
  ],
  title: "Dead Reckoning",
  episodeType: "standard",
  stillPath: "/fsaBo9LmK6rx19SsKSXCL7cG4Uy.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
