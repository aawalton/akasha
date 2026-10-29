import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS03e06 = {
  id: "01a18884-b708-7351-86df-f406bde536a8",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s03e06",
  description:
    "Stardate: 43205.6. While investigating an ancient ship left adrift in space, the Enterprise accidentally trips the ancient booby trap that disabled the old vessel over 1000 years ago.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-3"],
  position: 6,
  publishedAt: "1989-10-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37215",
      externalLink: "https://www.themoviedb.org/tv/655/season/3/episode/6",
    },
  ],
  title: "Booby Trap",
  episodeType: "standard",
  stillPath: "/1HCseDMup6JfjOAEOEuFVxQYl8f.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
