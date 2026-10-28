import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const jojoSBizarreAdventureSeason1 = {
  id: "01a183d4-4632-7277-a267-94dcf5591d69",
  type: "page-type/season",
  slug: "jojo-s-bizarre-adventure-season-1",
  description:
    "Jonathan Joestar's antagonistic relationship with his adopted brother Dio begins a truly bizarre lineage, which is continued by his grandson Joseph.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/jojo-s-bizarre-adventure"],
  position: 1,
  publishedAt: "2012-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54261",
      externalLink: "https://www.themoviedb.org/tv/45790/season/1",
    },
  ],
  title: "Phantom Blood & Battle Tendency",
  posterPath: "/co0K9FS9rQPxPoKADs4nuGckk3A.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T18:44:49.318Z",
} as const satisfies Season
