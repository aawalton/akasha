import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e02 = {
  id: "01a18844-6110-7e57-bdef-f2aa180835f9",
  type: "page-type/episode",
  slug: "clone-wars-s05e02",
  description:
    "Anakin, Obi-Wan, Ahsoka, and Rex travel to Onderon, a world under Separatist control. There, they will train a group of insurgent rebels -- including Lux Bonteri -- to help take back the capital city of Iziz from the rule of a duplicitous king.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 2,
  publishedAt: "2012-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010346",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/2",
    },
  ],
  title: "A War on Two Fronts",
  episodeType: "standard",
  stillPath: "/C3RzCYWcj81Bq5kQTnKjBqceVz.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
