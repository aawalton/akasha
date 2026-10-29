import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica2004S04e09 = {
  id: "01a18843-80ea-78fe-b6ab-b4416d199fea",
  type: "page-type/episode",
  slug: "battlestar-galactica-2004-s04e09",
  description:
    "Colonial Viper pilots plan an attack on the Resurrection Hub with their Cylon rebel allies.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-2004-season-4"],
  position: 9,
  publishedAt: "2008-06-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134245",
      externalLink: "https://www.themoviedb.org/tv/1972/season/4/episode/9",
    },
  ],
  title: "The Hub",
  episodeType: "standard",
  stillPath: "/5mopODAJ5TLP1RlxtGiW3UwmSBS.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Episode
