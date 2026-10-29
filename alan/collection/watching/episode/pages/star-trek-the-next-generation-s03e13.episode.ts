import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS03e13 = {
  id: "01a18884-b708-7bb5-bdfa-f53c488af8bd",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s03e13",
  description:
    "Stardate: 43539.1. A Calamarian starts attacking the Enterprise while seeking revenge on a powerless Q.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-3"],
  position: 13,
  publishedAt: "1990-02-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37222",
      externalLink: "https://www.themoviedb.org/tv/655/season/3/episode/13",
    },
  ],
  title: "Déjà Q",
  episodeType: "standard",
  stillPath: "/lVhkvjaFyicnMdSBoGjPf0sNzIj.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
