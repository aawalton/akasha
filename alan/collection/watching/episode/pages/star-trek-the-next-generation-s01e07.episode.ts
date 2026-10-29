import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e07 = {
  id: "01a18884-b705-79cd-861c-9cc2c0eea251",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e07",
  description:
    "Stardate: 41255.6. Picard is forced to choose between friendship and the Prime Directive when Wesley Crusher is sentenced to death for accidentally breaking the law on Rubicon III.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 7,
  publishedAt: "1987-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37070",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/7",
    },
  ],
  title: "Justice",
  episodeType: "standard",
  stillPath: "/trvcmdI2kbwnKxi6uYcjXCUfKMh.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
