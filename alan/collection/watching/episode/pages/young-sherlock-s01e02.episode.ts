import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS01e02 = {
  id: "01a1447e-0757-7d7b-bbd5-0c9f358e9780",
  type: "page-type/episode",
  slug: "young-sherlock-s01e02",
  description: "Sherlock is thrown into jail. He has to clear his name or face the gallows.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/young-sherlock-season-1"],
  position: 2,
  publishedAt: "2026-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5657753",
      externalLink: "https://www.themoviedb.org/tv/255661/season/1/episode/2",
    },
  ],
  title: "The Case of the Burnt Photograph",
  episodeType: "standard",
  stillPath: "/fRXi19UrOW3p7c5GWikkAFGFdRU.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
