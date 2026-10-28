import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const jojoSBizarreAdventureSeason3 = {
  id: "01a183d4-4632-7a77-a9e8-f211b5d98afa",
  type: "page-type/season",
  slug: "jojo-s-bizarre-adventure-season-3",
  description:
    "It's the year 1999, 11 years after Jotaro Kujo's desperate fight against DIO in Egypt. Jotaro meets with Josuke Higashikata, the illegitimate son of his grandfather Joseph Joestar. He discovers that Josuke also has the same \"Stand\" power and that a new threat is surfacing in Morioh City.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/jojo-s-bizarre-adventure"],
  position: 3,
  publishedAt: "2016-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64407",
      externalLink: "https://www.themoviedb.org/tv/45790/season/3",
    },
  ],
  title: "Diamond Is Unbreakable",
  posterPath: "/9X4iCnCBZ7Y1AXi4nm4RfMwLW4I.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T18:44:49.318Z",
} as const satisfies Season
