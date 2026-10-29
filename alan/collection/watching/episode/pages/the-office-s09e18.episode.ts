import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e18 = {
  id: "01a18857-c36f-758e-a956-33a4b2604757",
  type: "page-type/episode",
  slug: "the-office-s09e18",
  description:
    "Everyone in the office is excited when promos start running on TV for the documentary. Dwight makes Angela jealous when he starts dating a brussel sprout farmer. Meanwhile Jim has a big meeting with Major League baseball player, Ryan Howard.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 18,
  publishedAt: "2013-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170333",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/18",
    },
  ],
  title: "Promos",
  episodeType: "standard",
  stillPath: "/aDdapd9idn06AAQsLVvaSDSrWlm.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
