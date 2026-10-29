import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS04e01 = {
  id: "01a18844-d7e9-777c-99b4-3718c4dc0ab4",
  type: "page-type/episode",
  slug: "criminal-minds-s04e01",
  description:
    "When an SUV carrying members of the team explodes, the rest of the team fights to save them and catch the terrorists responsible for the bombing.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-4"],
  position: 1,
  publishedAt: "2008-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282841",
      externalLink: "https://www.themoviedb.org/tv/4057/season/4/episode/1",
    },
  ],
  title: "Mayhem",
  episodeType: "standard",
  stillPath: "/zb8Zl86UQaOQMlj7l9Hipmxh8Qt.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
