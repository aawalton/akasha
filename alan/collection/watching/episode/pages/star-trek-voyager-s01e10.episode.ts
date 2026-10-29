import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e10 = {
  id: "01a18853-ac89-7b6d-8f95-8552b68cf008",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e10",
  description:
    "Stardate: 48658.2. When stolen Federation technology is found on a severely damaged Kazon Nistrim ship, Seska becomes the prime suspect. The evidence is further reinforced when questions arise regarding her true heritage.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 10,
  publishedAt: "1995-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112941",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/10",
    },
  ],
  title: "State of Flux",
  episodeType: "standard",
  stillPath: "/HUc3qzArETzOFwFvbTQZSXMFv1.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
