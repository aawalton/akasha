import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS03e10 = {
  id: "01a18849-3529-72dc-b7ff-1166664d60e2",
  type: "page-type/episode",
  slug: "good-witch-s03e10",
  description:
    "After learning that Sam doesn't plan on getting married again, Cassie goes to Chicago to clear her head. Michael and Vanessa get fed up with their mothers while planning the wedding.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-3"],
  position: 10,
  publishedAt: "2017-07-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1327782",
      externalLink: "https://www.themoviedb.org/tv/61864/season/3/episode/10",
    },
  ],
  title: "Not Getting Married Today, Part 2",
  episodeType: "finale",
  stillPath: "/4guUGqLGw0qkZXwoCsVxg67CvyQ.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
