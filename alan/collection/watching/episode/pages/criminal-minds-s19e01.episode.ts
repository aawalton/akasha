import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS19e01 = {
  id: "01a18844-d7fb-7f32-b589-81a766db645b",
  type: "page-type/episode",
  slug: "criminal-minds-s19e01",
  description:
    "The BAU hunts kidnappers targeting couples as Elias Voit faces a familiar darkness in prison.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-19"],
  position: 1,
  publishedAt: "2026-05-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7076011",
      externalLink: "https://www.themoviedb.org/tv/4057/season/19/episode/1",
    },
  ],
  title: "Now and Then",
  episodeType: "standard",
  stillPath: "/c0y03Hzr3fZN64zsLFi1GbsPmXt.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
