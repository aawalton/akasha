import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS03e01 = {
  id: "01a18884-b707-7fdd-ad3c-801412b137f4",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s03e01",
  description:
    "Stardate: 43125.8. A system-wide computer malfunction places the crew of the U.S.S. Enterprise in grave danger while they are escorting a scientist to a star in the process of exploding.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-3"],
  position: 1,
  publishedAt: "1989-09-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37210",
      externalLink: "https://www.themoviedb.org/tv/655/season/3/episode/1",
    },
  ],
  title: "Evolution",
  episodeType: "standard",
  stillPath: "/A11EFKgifRteVHS4ejLiedDGJbe.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
