import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e13 = {
  id: "01a18884-b709-7000-8c01-13ad2bf0eba8",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e13",
  description:
    "Stardate: 44474.5. The crew of the Enterprise must defend the planet Ventax from a mythological Devil who re-appears when a 1000 year long era of peace comes to an end.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 13,
  publishedAt: "1991-02-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37117",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/13",
    },
  ],
  title: "Devil's Due",
  episodeType: "standard",
  stillPath: "/rGuL4CgUc2x8c3LaiW0XOy8QiXD.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
