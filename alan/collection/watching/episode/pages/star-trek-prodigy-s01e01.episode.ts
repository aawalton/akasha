import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e01 = {
  id: "01a18853-1b88-767b-a6b1-641f08b35702",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e01",
  description:
    "A group of lawless teens, exiled on a mining colony outside Federation space, discover a derelict Starfleet ship. Dal must gather an unlikely crew for their newfound ship if they are going to escape Tars Lamora, but the Diviner and his daughter Gwyn have other plans.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 1,
  publishedAt: "2021-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2362968",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/1",
    },
  ],
  title: "Lost & Found (1) / Lost & Found (2)",
  episodeType: "standard",
  stillPath: "/sPerp6iLSRcnQuor5yD8yX5lGb7.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
