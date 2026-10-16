import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS01e04 = {
  id: "01a1447e-0757-7bdc-b98c-cd064f513b27",
  type: "page-type/episode",
  slug: "young-sherlock-s01e04",
  description: "Sherlock returns to his childhood home in search of answers.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/young-sherlock-season-1"],
  position: 4,
  publishedAt: "2026-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5657755",
      externalLink: "https://www.themoviedb.org/tv/255661/season/1/episode/4",
    },
  ],
  title: "The Case of the Missing Button",
  episodeType: "standard",
  stillPath: "/i3ebygGTIcnfYAiFpHpKFO0oBSs.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
