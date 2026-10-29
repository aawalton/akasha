import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS05e10 = {
  id: "01a18853-690e-7526-bcbb-fbff4b5a9115",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s05e10",
  description:
    "Stardate: 45376.3. Worf's son, Alexander, unexpectedly arrives on the Enterprise to stay with his father. However, Alexander wants to stay permanently.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-5"],
  position: 10,
  publishedAt: "1992-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37140",
      externalLink: "https://www.themoviedb.org/tv/655/season/5/episode/10",
    },
  ],
  title: "New Ground",
  episodeType: "standard",
  stillPath: "/as4R5ptV8AhDgkaEH0eQsRQyMOm.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
