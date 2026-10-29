import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const galactica1980S01e01 = {
  id: "01a18848-eded-74d4-b3a5-5ea973d772da",
  type: "page-type/episode",
  slug: "galactica-1980-s01e01",
  description:
    "Thirty years after its voyage began, the Galactica finally nears Earth, but to their utter disappointment they find Earth's technology is no match for the Cylons.  Adama dispatches two pilots with a mission to secretly speed up Earth's defence development.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/galactica-1980-season-1"],
  position: 1,
  publishedAt: "1980-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335318",
      externalLink: "https://www.themoviedb.org/tv/4621/season/1/episode/1",
    },
  ],
  title: "Galactica Discovers Earth (1)",
  episodeType: "standard",
  stillPath: "/7GiPCfo82rmsDEnjDocwNz3ZJHf.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:30:43.309Z",
  updatedAt: "2026-10-29T15:30:43.309Z",
} as const satisfies Episode
