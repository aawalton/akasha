import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e05 = {
  id: "01a1887f-e18a-70a0-b7e9-05f55a40e232",
  type: "page-type/episode",
  slug: "star-trek-2-s03e05",
  description: "The Enterprise travels with an alien ambassador whose appearance induces madness.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 5,
  publishedAt: "1968-10-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14017",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/5",
    },
  ],
  title: "Is There in Truth No Beauty?",
  episodeType: "standard",
  stillPath: "/uNukl2SVg6MsTVbtjVVhdcp5bkm.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
