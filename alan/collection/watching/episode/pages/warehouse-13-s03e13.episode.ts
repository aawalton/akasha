import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S03e13 = {
  id: "01a18859-8870-7526-8aa0-56fd40de0005",
  type: "page-type/episode",
  slug: "warehouse-13-s03e13",
  description:
    "Pete Lattimer is hit in the head by an artifact and wakes up to a life where he was never born. Pete must hunt down and persuade the Warehouse team (none of whom recognize him) to go on this life or death mission with him to vanquish a long dead nemesis from the past to get everyone’s lives back.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-3"],
  position: 13,
  publishedAt: "2011-12-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541604",
      externalLink: "https://www.themoviedb.org/tv/15819/season/3/episode/13",
    },
  ],
  title: "The Greatest Gift",
  episodeType: "finale",
  stillPath: "/2B7OLXvWfuDzMh0lsEaPON0RxAX.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
