import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e24 = {
  id: "01a18884-b70a-746f-a15e-680531c049cf",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e24",
  description:
    "Stardate: 44885.5. While en route to Risa for shore leave, Geordi is abducted by the Romulans and brainwashed into becoming an assassin.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 24,
  publishedAt: "1991-05-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37128",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/24",
    },
  ],
  title: "The Mind's Eye",
  episodeType: "standard",
  stillPath: "/dqpepbEykFdd4uFj1u8qN0SxCEk.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
