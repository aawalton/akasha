import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e10 = {
  id: "01a18884-b707-7ee7-9553-b94aa9f603af",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e10",
  description:
    "Stardate: 42568.8. Wesley falls in love with a passenger the Enterprise is escorting, who has the secret ability to shape-shift.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 10,
  publishedAt: "1989-02-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37094",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/10",
    },
  ],
  title: "The Dauphin",
  episodeType: "standard",
  stillPath: "/vbPX8M4ZiBSHI2LbFDJpCfyQYXC.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
