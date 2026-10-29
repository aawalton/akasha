import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e13 = {
  id: "01a18880-75e8-7699-a03b-376957b33bac",
  type: "page-type/episode",
  slug: "the-mentalist-s03e13",
  description:
    "When Patrick Jane and others are taken hostage by an armed man accused of murder, Jane must think quickly to defuse the situation.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 13,
  publishedAt: "2011-02-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367751",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/13",
    },
  ],
  title: "Red Alert",
  episodeType: "standard",
  stillPath: "/gzOyVHjFSf2QVc6fpjJxC06VJn6.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
