import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e05 = {
  id: "01a1884b-ef63-781a-8e12-26967d69559c",
  type: "page-type/episode",
  slug: "ncis-s02e05",
  description:
    "NCIS discover that an area in a Marine's bombing range is where mafia has been dumping bodies for a while. One of the victims is an undercover FBI agent. The team set out to find a mole.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 5,
  publishedAt: "2004-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334500",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/5",
    },
  ],
  title: "The Bone Yard",
  episodeType: "standard",
  stillPath: "/7tDvEftJeEwt9MeumZc0vm3SWdy.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
