import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e21 = {
  id: "01a18884-b706-762c-b2b4-cc1128940006",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e21",
  description:
    "Stardate: Unknown. Picard attempts to break an ancient co-dependency between two species on one planet without violating the Prime Directive.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 21,
  publishedAt: "1988-04-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37081",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/21",
    },
  ],
  title: "Symbiosis",
  episodeType: "standard",
  stillPath: "/5z4RbWeiCPZ4KBza5pp0Yet4WRm.jpg",
  voteAverage: 6.853,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
