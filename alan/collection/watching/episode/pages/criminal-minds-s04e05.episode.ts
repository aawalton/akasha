import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS04e05 = {
  id: "01a18844-d7e9-70bc-bfcd-d7f21ec94ea9",
  type: "page-type/episode",
  slug: "criminal-minds-s04e05",
  description:
    "The BAU investigates a series of murders that appear to be connected to a killer who jumps trains and chooses his victims based on their proximity to the railway.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-4"],
  position: 5,
  publishedAt: "2008-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282664",
      externalLink: "https://www.themoviedb.org/tv/4057/season/4/episode/5",
    },
  ],
  title: "Catching Out",
  episodeType: "standard",
  stillPath: "/uBGJChna8pYsLtcqDUnOIbvCRZi.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
