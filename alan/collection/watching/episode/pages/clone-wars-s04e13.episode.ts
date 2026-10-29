import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS04e13 = {
  id: "01a18844-6110-76f8-9439-feb05b41533a",
  type: "page-type/episode",
  slug: "clone-wars-s04e13",
  description:
    "Anakin tries to convince the Zygerrian Queen that she too is a slave and pawn in an evil Separatist plot. Meanwhile, Obi-Wan toils in the slave camps of Kadavo, a grim situation that grows increasingly bleak.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-4"],
  position: 13,
  publishedAt: "2012-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286678",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4/episode/13",
    },
  ],
  title: "Escape from Kadavo",
  episodeType: "standard",
  stillPath: "/r3JtETLuWg6UFA719nvdXEILgyt.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
