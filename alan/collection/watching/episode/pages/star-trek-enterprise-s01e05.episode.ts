import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e05 = {
  id: "01a18852-d42f-7041-baca-354e9b635d3a",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e05",
  description:
    "When Trip is dispatched to assist a Xyrillian ship with its power source problems, he is delighted to have a friendly encounter with one of the ship's female engineers. However, shortly after returning to Enterprise, he discovers that their seemingly innocuous interaction has led to a surprising result.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 5,
  publishedAt: "2001-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15541",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/5",
    },
  ],
  title: "Unexpected",
  episodeType: "standard",
  stillPath: "/mHoZ2EndKQWLW5FkBTDMibrgoSk.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
