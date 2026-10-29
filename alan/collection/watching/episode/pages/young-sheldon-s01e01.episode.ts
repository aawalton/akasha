import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e01 = {
  id: "01a1885a-2529-7608-b9e7-a353d05e605b",
  type: "page-type/episode",
  slug: "young-sheldon-s01e01",
  description:
    "9-year-old Sheldon Cooper is a once-in-a-generation mind capable of advanced mathematics and science but learns that isn’t always helpful growing up in East Texas, a land where church and football are king.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 1,
  publishedAt: "2017-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1318082",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/hBvcnPMl9qAMvMKzoRMc7qV3Y89.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
