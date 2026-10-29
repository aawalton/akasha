import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e06 = {
  id: "01a18853-1b88-767f-9276-c5f260f357b9",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e06",
  description:
    "As Gwyn struggles to find her role aboard the U.S.S. Protostar, Dal tests his leadership skills in the newly discovered holodeck.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 6,
  publishedAt: "2022-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3340508",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/6",
    },
  ],
  title: "Kobayashi",
  episodeType: "standard",
  stillPath: "/UoiXnRhlq8CknEtvjen8A32ax4.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
