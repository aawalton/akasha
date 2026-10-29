import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica2004S02e02 = {
  id: "01a18843-80e7-777d-a3f1-9f3ff49f9521",
  type: "page-type/episode",
  slug: "battlestar-galactica-2004-s02e02",
  description:
    "Tigh has to work with Lee to defeat a Cylon boarding party that threatens to take over Galactica and destroy the fleet.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-2004-season-2"],
  position: 2,
  publishedAt: "2005-07-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134150",
      externalLink: "https://www.themoviedb.org/tv/1972/season/2/episode/2",
    },
  ],
  title: "Valley of Darkness",
  episodeType: "standard",
  stillPath: "/5If0bjF4iYFP96rIfMWrddLfxH8.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Episode
