import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e16 = {
  id: "01a18853-1b88-7d9e-97d5-4ef4f21af2d8",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e16",
  description:
    "A Starfleet Admiral digs into the past of the Protostar crew. Meanwhile, the Diviner recalls his life's mission.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 16,
  publishedAt: "2022-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983096",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/16",
    },
  ],
  title: "Preludes",
  episodeType: "standard",
  stillPath: "/vMEsP63MgTV9KOkFiZNCO4oE5KD.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
