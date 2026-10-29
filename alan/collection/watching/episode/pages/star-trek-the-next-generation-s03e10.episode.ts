import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS03e10 = {
  id: "01a18884-b708-77d5-a7e6-543e90611982",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s03e10",
  description:
    "Stardate: 43462.5. A defecting Romulan warns the Federation about an impending attack by the Romulans, who are secretly establishing bases within the Neutral Zone.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-3"],
  position: 10,
  publishedAt: "1990-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37219",
      externalLink: "https://www.themoviedb.org/tv/655/season/3/episode/10",
    },
  ],
  title: "The Defector",
  episodeType: "standard",
  stillPath: "/dhVqwIoQpeMxZEgMir2nOdDOerq.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
