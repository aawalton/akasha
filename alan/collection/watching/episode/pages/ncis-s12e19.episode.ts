import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e19 = {
  id: "01a1884b-ef72-79f7-81e8-29053058601f",
  type: "page-type/episode",
  slug: "ncis-s12e19",
  description:
    "The murder of a Petty Officer sparks a lead in a 40-year-old airport bombing cold case that Gibbs and DiNozzo have been assigned to for the past two years.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 19,
  publishedAt: "2015-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1047227",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/19",
    },
  ],
  title: "Patience",
  episodeType: "standard",
  stillPath: "/wDNKlIu7KQ0pGczd0ZDQv7eTw4i.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
