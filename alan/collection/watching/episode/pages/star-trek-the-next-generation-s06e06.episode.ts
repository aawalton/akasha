import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS06e06 = {
  id: "01a18853-690f-733f-90e9-ae39c63155bd",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s06e06",
  description:
    "Stardate: 46192.3. A young intern visiting the Enterprise captures the interest of Q when she starts displaying Q-like powers.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-6"],
  position: 6,
  publishedAt: "1992-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37163",
      externalLink: "https://www.themoviedb.org/tv/655/season/6/episode/6",
    },
  ],
  title: "True Q",
  episodeType: "standard",
  stillPath: "/aNhrfQPyH0bggWeP4Cz1ngu84r4.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
