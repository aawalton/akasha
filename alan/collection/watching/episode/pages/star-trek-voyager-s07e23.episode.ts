import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e23 = {
  id: "01a18853-ac93-7932-8299-8e0481464217",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e23",
  description:
    "Stardate: 54868.6 - Neelix finds he must make hard choices when he becomes involved in the struggle of Talaxian refugees whose home in an asteroid belt is threatened by alien miners.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 23,
  publishedAt: "2001-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466888",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/23",
    },
  ],
  title: "Homestead",
  episodeType: "standard",
  stillPath: "/rf5mb5HPboXaP68krCfDrVZgndb.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
