import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e15 = {
  id: "01a18853-ddfd-7b83-83e4-1950eb5fdc16",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e15",
  description:
    "Zeb and Agent Kallus find themselves stranded on an ice planet after a failed Imperial ambush of the rebels. With Kallus injured from the escape pod crash, he and Zeb must work together to survive the harsh conditions.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 15,
  publishedAt: "2016-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1167094",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/15",
    },
  ],
  title: "The Honorable Ones",
  episodeType: "standard",
  stillPath: "/fCOMbSbDFtyh4nMEH1bUFNwukG5.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
