import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS03e02 = {
  id: "01a18884-b707-7db7-80f7-ec7d3f007e9c",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s03e02",
  description:
    "Stardate: 43133.3. A human colony is forced to evacuate a planet when the original inhabitants return and threaten the colonists with annihilation if they do not leave within four days.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-3"],
  position: 2,
  publishedAt: "1989-10-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37211",
      externalLink: "https://www.themoviedb.org/tv/655/season/3/episode/2",
    },
  ],
  title: "The Ensigns of Command",
  episodeType: "standard",
  stillPath: "/rnqUppIYQ69b96Q5NNS3XFHeyh9.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
