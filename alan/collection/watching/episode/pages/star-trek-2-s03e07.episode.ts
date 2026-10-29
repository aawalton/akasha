import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e07 = {
  id: "01a1887f-e18a-71e7-ab63-2914e65f4946",
  type: "page-type/episode",
  slug: "star-trek-2-s03e07",
  description:
    "An alien force drives the crew of the Enterprise into brutal conflict with the Klingons.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 7,
  publishedAt: "1968-11-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14021",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/7",
    },
  ],
  title: "Day of the Dove",
  episodeType: "standard",
  stillPath: "/jRzqf68yOSEw8oAZucdmHqe3tgd.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
