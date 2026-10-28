import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const jojoSBizarreAdventureS06e01 = {
  id: "01a183d4-4631-74f4-847e-48efc9e6884c",
  type: "page-type/episode",
  slug: "jojo-s-bizarre-adventure-s06e01",
  description:
    "After a fateful encounter with outlaw Gyro Zeppeli, former racing prodigy Johnny Joestar enters the Steel Ball Run, the first horse race across America.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/jojo-s-bizarre-adventure-season-6"],
  position: 1,
  publishedAt: "2026-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6773515",
      externalLink: "https://www.themoviedb.org/tv/45790/season/6/episode/1",
    },
  ],
  title: "STEEL BALL RUN",
  episodeType: "standard",
  stillPath: "/4ATJwDwspxLCYEZaRbCpIyxd7Wo.jpg",
  voteAverage: 9.3,
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T18:44:49.318Z",
} as const satisfies Episode
