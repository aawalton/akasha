import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e04 = {
  id: "01a18884-b704-7f1b-ba33-727fc5b8a6bb",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e04",
  description:
    "Stardate: 41386.4. A powerful entity disables the Enterprise and a Ferengi ship. Their only means of escape is if they can correctly answer the riddles he asks.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 4,
  publishedAt: "1987-10-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37067",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/4",
    },
  ],
  title: "The Last Outpost",
  episodeType: "standard",
  stillPath: "/5xh0aAaEhxyBXDVo7bxMy0qZC3W.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
