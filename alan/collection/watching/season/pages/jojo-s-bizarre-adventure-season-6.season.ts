import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const jojoSBizarreAdventureSeason6 = {
  id: "01a183d4-4632-7ad6-be90-7996e7156a15",
  type: "page-type/season",
  slug: "jojo-s-bizarre-adventure-season-6",
  description:
    "America, 1890. Johnny Joestar, a genius jockey now paralyzed from the waist down, chases after outlaw Gyro Zeppeli in a tough cross-continent horse race.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/jojo-s-bizarre-adventure"],
  position: 6,
  publishedAt: "2026-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "451151",
      externalLink: "https://www.themoviedb.org/tv/45790/season/6",
    },
  ],
  title: "STEEL BALL RUN",
  posterPath: "/yB2cUOuT3OMGtU3CTLQjuFUL8Ox.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T18:44:49.318Z",
} as const satisfies Season
