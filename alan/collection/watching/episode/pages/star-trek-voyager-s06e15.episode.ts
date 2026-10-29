import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e15 = {
  id: "01a18853-ac91-7466-b4cd-ccfedf47d9fd",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e15",
  description:
    "Stardate: Unknown. Seven of Nine is kidnapped and forced into the ring in a violent combat sport.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 15,
  publishedAt: "2000-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113330",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/15",
    },
  ],
  title: "Tsunkatse",
  episodeType: "standard",
  stillPath: "/f5z3lO6YygO0SvneYaeuZ9NyT5c.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
