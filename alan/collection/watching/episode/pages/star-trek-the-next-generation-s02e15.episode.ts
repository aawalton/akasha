import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e15 = {
  id: "01a18884-b707-7acd-8fc0-a7d8e4a29184",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e15",
  description:
    "Stardate: 42695.3. Wesley must investigate the causes of strange tectonic activity on the planet where Data's pen pal lives.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 15,
  publishedAt: "1989-05-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37099",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/15",
    },
  ],
  title: "Pen Pals",
  episodeType: "standard",
  stillPath: "/qH9CgijwOUzfC9hvRHALPYAQaef.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
