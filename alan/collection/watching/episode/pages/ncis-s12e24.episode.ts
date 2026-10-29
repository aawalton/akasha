import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e24 = {
  id: "01a1884b-ef73-7327-a2bf-67ec87b149a2",
  type: "page-type/episode",
  slug: "ncis-s12e24",
  description:
    "NCIS feverishly investigates a global terrorist group that is recruiting teens via the Internet, following a deadly bombing overseas that results in an emotional and surprising loss for the team.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 24,
  publishedAt: "2015-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1055137",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/24",
    },
  ],
  title: "Neverland",
  episodeType: "finale",
  stillPath: "/r4EQ4UwbTSb3x0O5wsQ5QXPsCsz.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
