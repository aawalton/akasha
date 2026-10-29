import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e04 = {
  id: "01a18851-3df6-7995-9c91-cc3cdb50407c",
  type: "page-type/episode",
  slug: "person-of-interest-s04e04",
  description:
    "Reese's cover job as a detective at the NYPD becomes complicated when the young brother and sister he's protecting become targets of a gang investigation.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 4,
  publishedAt: "2014-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005685",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/4",
    },
  ],
  title: "Brotherhood",
  episodeType: "standard",
  stillPath: "/g2G23LraH0SycCk03e7hl3hlMex.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
