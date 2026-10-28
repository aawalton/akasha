import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const neonGenesisEvangelionS01e01 = {
  id: "01a183d4-bed1-7c91-b8f4-ed0e7615fe49",
  type: "page-type/episode",
  slug: "neon-genesis-evangelion-s01e01",
  description:
    "Shinji Ikari is summoned to Tokyo-3 by his estranged father Gendo, commander of the special agency NERV, to defend the city from a giant Angel by piloting the only weapon capable of battling the monster: Evangelion Unit-01.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/neon-genesis-evangelion-season-1"],
  position: 1,
  publishedAt: "1995-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "949381",
      externalLink: "https://www.themoviedb.org/tv/890/season/1/episode/1",
    },
  ],
  title: "Angel Attack",
  episodeType: "standard",
  stillPath: "/71RH9vhaIOwQVFxv09DftCgmwLh.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:45:20.209Z",
  updatedAt: "2026-10-28T18:45:20.209Z",
} as const satisfies Episode
