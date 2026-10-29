import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e21 = {
  id: "01a1884b-ef6c-7e24-9d8e-a7daaddef3fd",
  type: "page-type/episode",
  slug: "ncis-s07e21",
  description:
    "DiNozzo finds himself increasingly captivated by a woman he's never met while investigating the murder of her brother.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 21,
  publishedAt: "2010-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334559",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/21",
    },
  ],
  title: "Obsession",
  episodeType: "standard",
  stillPath: "/oBu5JbYfgaPnK7oRvNpCYRIr9QM.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
