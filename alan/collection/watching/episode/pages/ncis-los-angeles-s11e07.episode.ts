import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e07 = {
  id: "01a1884a-e0f4-73a7-8782-801e4f3af583",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e07",
  description:
    "The NCIS team links the theft of an undersea drone prototype to a video game streamer’s elaborate party. Also, Callen and Sam cross paths again with insurance broker Katherine Casillas, who insures the gamer’s property and processions.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 7,
  publishedAt: "2019-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1979626",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/7",
    },
  ],
  title: "Concours d’Elegance",
  episodeType: "standard",
  stillPath: "/mcjdAGUAQkGJWo7FBbWmfprmjyp.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
