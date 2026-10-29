import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e06 = {
  id: "01a1884b-ef72-7b6d-8794-36aa08c5fe50",
  type: "page-type/episode",
  slug: "ncis-s12e06",
  description:
    "The NCIS team must determine if the murder of a Navy Commander's wife is linked to her profession as a therapist or an act of terrorism after finding the Commander's name on a Jihadist target list.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 6,
  publishedAt: "2014-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010123",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/6",
    },
  ],
  title: "Parental Guidance Suggested",
  episodeType: "standard",
  stillPath: "/ahX80hVP5Bc1sy6CZrxLvbbLp.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
