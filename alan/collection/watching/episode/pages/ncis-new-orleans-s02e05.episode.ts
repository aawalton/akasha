import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e05 = {
  id: "01a1884b-3016-7be3-bdf4-7855b8d81b3f",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e05",
  description:
    "Special Agent Pride is sent a partner from the Australian Defence Force Investigation Service, Special Agent Naomi Parsons, after an Royal Australian Navy Lieutenant, who was key to international negotiations on nuclear weapons, is murdered in New Orleans.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 5,
  publishedAt: "2015-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1131528",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/5",
    },
  ],
  title: "Foreign Affairs",
  episodeType: "standard",
  stillPath: "/fKpsaeo5RZnny7ukr2a3PA5mumS.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
