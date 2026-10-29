import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e07 = {
  id: "01a18853-ac8a-7b83-a482-0492d187c22f",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e07",
  description:
    "Stardate: Unknown. Tom Paris and Neelix, while fighting over Kes’s affections, crash-land on a dangerous planet and become responsible for a sickly baby creature.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 7,
  publishedAt: "1995-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112973",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/7",
    },
  ],
  title: "Parturition",
  episodeType: "standard",
  stillPath: "/qUoeXa720l1OkFkVVcFCrGWTchG.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
