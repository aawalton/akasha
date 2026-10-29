import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS02e06 = {
  id: "01a18845-e1fa-79eb-acd8-59c4ceb45d09",
  type: "page-type/episode",
  slug: "daredevil-s02e06",
  description:
    "Fisk's operation is dealt an irrevocable blow. The resistance spills over into the streets.",
  ownLength: 52,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-2"],
  position: 6,
  publishedAt: "2026-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6825662",
      externalLink: "https://www.themoviedb.org/tv/202555/season/2/episode/6",
    },
  ],
  title: "Requiem",
  episodeType: "standard",
  stillPath: "/lbuiEvKOaQEw4mG880gsdg8GKvr.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
