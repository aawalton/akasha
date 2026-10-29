import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e23 = {
  id: "01a18884-b706-79d7-9102-0597cfa41c02",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e23",
  description:
    "Stardate: 41697.9. Picard meets an old flame, whose husband has created a haywire dimensional experiment.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 23,
  publishedAt: "1988-05-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37082",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/23",
    },
  ],
  title: "We'll Always Have Paris",
  episodeType: "standard",
  stillPath: "/u2Em614jAh1L9lwG480KmK3zDAz.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
