import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS06e12 = {
  id: "01a18853-690f-77d1-ab82-2c1b01cb40db",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s06e12",
  description:
    "Stardate: 46424.1. While performing holodeck maintenance, Barclay accesses the stored hologram of Professor Moriarty, who wreaks havoc on board the Enterprise.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-the-next-generation-season-6"],
  position: 12,
  publishedAt: "1993-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37168",
      externalLink: "https://www.themoviedb.org/tv/655/season/6/episode/12",
    },
  ],
  title: "Ship in a Bottle",
  episodeType: "standard",
  stillPath: "/8Nn4kvqpcIFvgJThpj1z8gdOVHC.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:10.189Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Episode
