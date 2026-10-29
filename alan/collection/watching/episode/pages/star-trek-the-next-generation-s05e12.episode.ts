import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS05e12 = {
  id: "01a18853-690e-7c80-95df-1dbe750523b9",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s05e12",
  description:
    "Stardate: 45429.3. While escorting a group of telepaths, crew members on board the Enterprise suddenly start to slip into comas.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-5"],
  position: 12,
  publishedAt: "1992-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37142",
      externalLink: "https://www.themoviedb.org/tv/655/season/5/episode/12",
    },
  ],
  title: "Violations",
  episodeType: "standard",
  stillPath: "/bvNQQGDP15Ri6MgrIugUnVGMwfJ.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
