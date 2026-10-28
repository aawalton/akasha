import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e16 = {
  id: "01a183da-447a-7098-947d-394924a5ddbd",
  type: "page-type/episode",
  slug: "k-on-s02e16",
  description:
    "Azusa realizes the music club has been slacking off lately, and she resolves to practice more.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 16,
  publishedAt: "2010-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879090",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/16",
    },
  ],
  title: "Upperclassmen!",
  episodeType: "standard",
  stillPath: "/9ygxfVfE3tYNMpiq0hfz1US5kt8.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
