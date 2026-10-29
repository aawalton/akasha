import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e11 = {
  id: "01a18884-b705-744f-be94-beae89b55238",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e11",
  description:
    "Stardate: 41997.7. Picard, Dr. Crusher and Data are placed in great danger when the holodeck malfunctions while they are running a Dixon Hill program, which pits them against 1940's mobsters.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 11,
  publishedAt: "1988-01-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37073",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/11",
    },
  ],
  title: "The Big Goodbye",
  episodeType: "standard",
  stillPath: "/qpsg0V1vy7eUgAbqnn6L8rMpMMp.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
