import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cedarCoveS01e01 = {
  id: "01a18844-02b5-7554-ae59-f680e4fb1003",
  type: "page-type/episode",
  slug: "cedar-cove-s01e01",
  description:
    "Judge Olivia Lockhart considers a career move that could cost her a new romance and force her to leave the town and friends she loves in the premiere of this drama series about the life of a small-town judge in and out of the courtroom.",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["season/cedar-cove-season-1"],
  position: 1,
  publishedAt: "2013-07-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "914695",
      externalLink: "https://www.themoviedb.org/tv/47320/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/8mXPvPMg0U9xIRP8J68X1OKDKyz.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:25:20.948Z",
  updatedAt: "2026-10-29T15:25:20.948Z",
} as const satisfies Episode
