import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica2004S02e15 = {
  id: "01a18843-80e7-7c66-9f38-8fad810d9e6b",
  type: "page-type/episode",
  slug: "battlestar-galactica-2004-s02e15",
  description:
    'A crazed Cylon Raider attacks the Colonial fleet in a series of hit-and-run attacks. Overworked Viper pilots must defend a mining operation from this Raider that they nickname "Scar."',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-2004-season-2"],
  position: 15,
  publishedAt: "2006-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134184",
      externalLink: "https://www.themoviedb.org/tv/1972/season/2/episode/15",
    },
  ],
  title: "Scar",
  episodeType: "standard",
  stillPath: "/5JZL9jYdOjLZOmebKybZr4ZzRxt.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Episode
