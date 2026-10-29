import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica2004S04e04 = {
  id: "01a18843-80ea-756e-be96-ad16b7057c94",
  type: "page-type/episode",
  slug: "battlestar-galactica-2004-s04e04",
  description:
    "Gaius Baltar sets off a debate on religious freedom when he promotes his belief in a single God.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-2004-season-4"],
  position: 4,
  publishedAt: "2008-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134239",
      externalLink: "https://www.themoviedb.org/tv/1972/season/4/episode/4",
    },
  ],
  title: "Escape Velocity",
  episodeType: "standard",
  stillPath: "/nJBwyNSk19vUk9zvFmpJDnlfPyH.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Episode
