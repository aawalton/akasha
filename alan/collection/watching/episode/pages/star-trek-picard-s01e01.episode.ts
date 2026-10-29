import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e01 = {
  id: "01a18853-07cd-7bd8-8227-6e4dad2ab495",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e01",
  description:
    "At the end of the 24th Century, and 14 years after his retirement from Starfleet, Jean-Luc Picard is living a quiet life on his vineyard, Chateau Picard. When he is sought out by a mysterious young woman, in need of his help, he soon realizes she may have personal connections to his own past.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 1,
  publishedAt: "2020-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1675693",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/1",
    },
  ],
  title: "Remembrance",
  episodeType: "standard",
  stillPath: "/lOHyfQhGqcPpakvRFkMpDUqjCwE.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
