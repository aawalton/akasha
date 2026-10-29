import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS03e12 = {
  id: "01a1884b-6702-7c0c-85ec-7f68f7197028",
  type: "page-type/episode",
  slug: "ncis-sydney-s03e12",
  description:
    "The team investigates a targeted explosion that wiped out a bomb squad with ties close to home.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-3"],
  position: 12,
  publishedAt: "2026-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7026713",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3/episode/12",
    },
  ],
  title: "Lone Wolf (1)",
  episodeType: "standard",
  stillPath: "/x6JEJEy1pam2v3Z7Z3MGK4CNlRU.jpg",
  voteAverage: 3.2,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
