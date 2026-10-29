import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e02 = {
  id: "01a18884-b704-71fe-9b20-37f9b607b52b",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e02",
  description:
    "Stardate: 41209.2. The crew of the Enterprise are infected with a virus contracted by the away team while they were investigating  the mysterious deaths of the entire crew of the Starship Tsilkovsky.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 2,
  publishedAt: "1987-10-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37065",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/2",
    },
  ],
  title: "The Naked Now",
  episodeType: "standard",
  stillPath: "/mhDWO4T9GvrWKY95ZdyJX4oMd3g.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
