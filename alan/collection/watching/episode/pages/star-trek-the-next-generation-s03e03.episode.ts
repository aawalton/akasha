import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS03e03 = {
  id: "01a18884-b707-7ae0-ae90-3fedde12772d",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s03e03",
  description:
    "Stardate: 43152.4. The Enterprise discovers a planet that has had all life eradicated, except for two mysterious residents and their home, which has been left in perfect condition.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-3"],
  position: 3,
  publishedAt: "1989-10-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37212",
      externalLink: "https://www.themoviedb.org/tv/655/season/3/episode/3",
    },
  ],
  title: "The Survivors",
  episodeType: "standard",
  stillPath: "/69NQq8GDmv4hWPHLn4hkUyt9xAH.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
