import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e15 = {
  id: "01a1884b-ef69-767b-b465-b0f6c29fb204",
  type: "page-type/episode",
  slug: "ncis-s06e15",
  description:
    "Demons of the past come back to haunt Gibbs when he finds a cryptic message waiting for him at a crime scene.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 15,
  publishedAt: "2009-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334419",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/15",
    },
  ],
  title: "Deliverance",
  episodeType: "standard",
  stillPath: "/tDbrLmh6sPGxjMUTfhPnYa1hmDz.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
