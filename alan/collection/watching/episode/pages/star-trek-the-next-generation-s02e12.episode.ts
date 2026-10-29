import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS02e12 = {
  id: "01a18884-b707-74b8-8b64-227f18550b83",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s02e12",
  description:
    "Stardate: 42625.4. An away team is trapped in an alien environment based around a novel entitled 'The Hotel Royale.'",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-2"],
  position: 12,
  publishedAt: "1989-03-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37096",
      externalLink: "https://www.themoviedb.org/tv/655/season/2/episode/12",
    },
  ],
  title: "The Royale",
  episodeType: "standard",
  stillPath: "/kKps2wj1WwTReUqTgo4REvOfM1T.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
