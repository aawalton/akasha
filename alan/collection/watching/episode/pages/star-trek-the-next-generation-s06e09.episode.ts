import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS06e09 = {
  id: "01a18853-690f-7a9b-8efd-4db993dc7f4f",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s06e09",
  description:
    "Stardate: 46315.2. Data discovers that the maintenance robots built by Dr. Farallon may have become sentient.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-6"],
  position: 9,
  publishedAt: "1992-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37166",
      externalLink: "https://www.themoviedb.org/tv/655/season/6/episode/9",
    },
  ],
  title: "The Quality of Life",
  episodeType: "standard",
  stillPath: "/d38X3XcjKaQtqbZlhbrHWzuGsDx.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
