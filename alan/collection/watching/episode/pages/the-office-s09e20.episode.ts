import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e20 = {
  id: "01a18857-c36f-7877-888f-770fc3870238",
  type: "page-type/episode",
  slug: "the-office-s09e20",
  description:
    "Dwight and Angela participate in a paper airplane contest and compete against each other. Meanwhile, Andy prepares for a potential acting job, and Jim and Pam utilize new skills.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 20,
  publishedAt: "2013-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170331",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/20",
    },
  ],
  title: "Paper Airplane",
  episodeType: "standard",
  stillPath: "/ztEK1MtwwbG7D0jb95A59qxaS3G.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
