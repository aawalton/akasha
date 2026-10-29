import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const msMarvelS01e01 = {
  id: "01a1887e-e2dd-7757-a099-8f563b60d73f",
  type: "page-type/episode",
  slug: "ms-marvel-s01e01",
  description:
    "Kamala Khan attends Avengercon only to discover that she herself might have superpowers.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/ms-marvel-miniseries"],
  position: 1,
  publishedAt: "2022-06-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2534986",
      externalLink: "https://www.themoviedb.org/tv/92782/season/1/episode/1",
    },
  ],
  title: "Generation Why",
  episodeType: "standard",
  stillPath: "/gaBBBVXwSED1XNHe2wyQypp6ead.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T16:29:39.421Z",
  updatedAt: "2026-10-29T16:29:39.421Z",
} as const satisfies Episode
