import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS04e01 = {
  id: "01a1884a-400b-7ed7-a589-3d8326d09efb",
  type: "page-type/episode",
  slug: "manifest-s04e01",
  description:
    "While investigating a Calling, Michaela finds a mysterious stowaway. Ben clings tightly to his beliefs. Cal comes out of hiding to pursue a lead.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-4"],
  position: 1,
  publishedAt: "2022-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3785272",
      externalLink: "https://www.themoviedb.org/tv/79696/season/4/episode/1",
    },
  ],
  title: "Touch-and-Go",
  episodeType: "standard",
  stillPath: "/AsiLgT4nlmbWSWTRnAWEyjR0uVj.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
