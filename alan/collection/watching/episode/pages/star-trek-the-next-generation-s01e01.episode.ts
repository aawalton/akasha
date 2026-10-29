import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e01 = {
  id: "01a18884-b704-7f7a-8934-a7664d6cef44",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e01",
  description:
    "Stardate: 41153.7. The new commander of the recently built U.S.S. Enterprise (NCC1701-D), Captain Jean-Luc Picard  takes the crew on their first mission to discover the secret of Farpoint Station. During their journey, they encounter an omnipotent being known as Q. Q accuses humanity of barbarism, and places humanity on trial. Jean-Luc must prove otherwise or the human race will be annihilated.",
  ownLength: 91,
  ownProgress: 91,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 1,
  publishedAt: "1987-09-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37064",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/1",
    },
  ],
  title: "Encounter at Farpoint",
  episodeType: "standard",
  stillPath: "/y5UXwnxTTSW8vPmIBwP0BffodQA.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
