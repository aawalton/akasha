import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e20 = {
  id: "01a1887f-e18a-79be-90a4-0a126450a1a5",
  type: "page-type/episode",
  slug: "star-trek-2-s03e20",
  description: 'The Enterprise picks up a group of space "hippies" looking for Eden.',
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 20,
  publishedAt: "1969-02-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14025",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/20",
    },
  ],
  title: "The Way to Eden",
  episodeType: "standard",
  stillPath: "/uzmRgYYwwfa5ee6JS9jM1rm4Dkb.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
