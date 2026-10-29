import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS04e13 = {
  id: "01a18855-67ea-7018-85b0-9e4d942de230",
  type: "page-type/episode",
  slug: "steven-universe-s04e13",
  description:
    'Steven finds Greg in Pink Diamond\'s "Human Zoo", and tries to look for a way out. This proves easier said than done as the humans there are guided through a strictly scheduled and regimented life',
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-4"],
  position: 13,
  publishedAt: "2017-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1263492",
      externalLink: "https://www.themoviedb.org/tv/61175/season/4/episode/13",
    },
  ],
  title: "The Zoo",
  episodeType: "standard",
  stillPath: "/ejcPyJOFMXk1vPfvuFDeJtKpTck.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
