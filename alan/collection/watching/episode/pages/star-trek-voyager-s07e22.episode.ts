import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e22 = {
  id: "01a18853-ac93-7648-8df5-711a9035df1d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e22",
  description:
    "Stardate: 54817.5 - Chakotay and Seven find themselves trapped with a primitive culture that is separated from the rest of its world by an energy field designed to protect them.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 22,
  publishedAt: "2001-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466870",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/22",
    },
  ],
  title: "Natural Law",
  episodeType: "standard",
  stillPath: "/4pstZ8uiyUHfg7U6bY2Vw5iLCnA.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
