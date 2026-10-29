import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e21 = {
  id: "01a18843-d14d-7d34-ac43-98b777c613eb",
  type: "page-type/episode",
  slug: "bluey-s01e21",
  description:
    "Bluey, Bingo, Mum and Dad play a game of hand puppets, exploring the land beyond the Blue Mountains where they outsmart the Cheeky Fox to find the softest beds in the world.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 21,
  publishedAt: "2018-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1597232",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/21",
    },
  ],
  title: "Blue Mountains",
  episodeType: "standard",
  stillPath: "/3uzpV4RXF38lbTrZ2SMhheSamsa.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
