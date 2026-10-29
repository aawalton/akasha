import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e02 = {
  id: "01a18853-07cd-7be3-8ac3-2cb5e26b05f5",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e02",
  description:
    "Picard begins investigating the mystery of Dahj as well as what her very existence means to the Federation. Without Starfleet's support, Picard is left leaning on others for help, including Dr. Agnes Jurati and an estranged former colleague, Raffi Musiker. Meanwhile, hidden enemies are also interested in where Picard's search for the truth about Dahj will lead.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 2,
  publishedAt: "2020-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2057376",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/2",
    },
  ],
  title: "Maps and Legends",
  episodeType: "standard",
  stillPath: "/3vFld9A4moYyYt2pHp8kNtgU1qr.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
