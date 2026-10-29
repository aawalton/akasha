import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const highPotentialS01e01 = {
  id: "01a18884-2f3b-7b5f-a857-2ee90f87f79a",
  type: "page-type/episode",
  slug: "high-potential-s01e01",
  description:
    "A single mom with an exceptional mind is recruited to the LAPD Major Crimes unit, where her unconventional knack for solving crimes leads to an unusual and unstoppable partnership with a by-the-book seasoned detective.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/high-potential-season-1"],
  position: 1,
  publishedAt: "2024-09-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4447673",
      externalLink: "https://www.themoviedb.org/tv/226637/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/28Ntz14QyOrwnuPnBZzMsFdqmZv.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:35:26.651Z",
  updatedAt: "2026-10-29T16:35:26.651Z",
} as const satisfies Episode
