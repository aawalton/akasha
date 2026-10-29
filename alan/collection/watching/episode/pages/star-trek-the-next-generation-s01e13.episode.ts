import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e13 = {
  id: "01a18884-b705-7db6-b370-118e886d852a",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e13",
  description:
    "Stardate: 41636.9. The Enterprise discovers the male crew of a crashed Federation freighter are hiding as fugitives on the planet Angel One, which is dominated and ruled by women.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 13,
  publishedAt: "1988-01-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37075",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/13",
    },
  ],
  title: "Angel One",
  episodeType: "standard",
  stillPath: "/jvYDpyI9TEm8ok6Vn5z4x3srG7Y.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
