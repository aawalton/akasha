import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e05 = {
  id: "01a18883-a8ae-7db3-88b1-b4fabf310e52",
  type: "page-type/episode",
  slug: "criminal-minds-s01e05",
  description:
    "The BAU investigates the kidnapping of a U.S. District Attorney's daughter and determines the kidnapper isn't seeking money -- he's after her twin sister.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 5,
  publishedAt: "2005-10-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282875",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/5",
    },
  ],
  title: "Broken Mirror",
  episodeType: "standard",
  stillPath: "/f3y70pxQqduNehv4ye6B7QcGonY.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
