import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e07 = {
  id: "01a18853-ac92-7782-8f14-a7d90c60c66e",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e07",
  description:
    "Stardate: 54283.3 - In a region of space where holograms are prohibited, the Doctor is forced to hide by transferring his program into Seven's mind, upon which he takes over control of her body.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 7,
  publishedAt: "2000-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466827",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/7",
    },
  ],
  title: "Body and Soul",
  episodeType: "standard",
  stillPath: "/ep3W4NjUrMZuGMr4MOLjsCNqGfz.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
