import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS02e04 = {
  id: "01a18853-07ce-7d7e-9e4d-a217e8752de4",
  type: "page-type/episode",
  slug: "star-trek-picard-s02e04",
  description:
    "With time running out to save the future, Picard takes matters into his own hands and seeks out an old friend for help. Meanwhile, Rios ends up on the wrong side of the law and Jurati makes a deal with the Borg Queen.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-2"],
  position: 4,
  publishedAt: "2022-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3603252",
      externalLink: "https://www.themoviedb.org/tv/85949/season/2/episode/4",
    },
  ],
  title: "Watcher",
  episodeType: "standard",
  stillPath: "/qpZkqzieMpj4V9jBBEAL6n8eo1r.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
