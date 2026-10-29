import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e03 = {
  id: "01a18844-6110-7211-aaa3-776d41457f75",
  type: "page-type/episode",
  slug: "clone-wars-s05e03",
  description:
    "Supervised by Ahsoka, the Onderon rebels infiltrate the capital and carry out a series of strikes on targets throughout the city. As the Separatist-aligned king comes under increasing pressure to deal with the growing rebellion, the rebels choose a new leader.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 3,
  publishedAt: "2012-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010347",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/3",
    },
  ],
  title: "Front Runners",
  episodeType: "standard",
  stillPath: "/oBcy28gInofdRh1nYZATakSBxPz.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
