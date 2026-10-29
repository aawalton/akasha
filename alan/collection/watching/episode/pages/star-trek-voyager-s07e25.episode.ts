import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e25 = {
  id: "01a18853-ac93-7851-b7b4-9ed3ce113353",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e25",
  description:
    "Stardate: 54973.4 - Twenty-six years in the future, a regretful Admiral Janeway hatches an audacious plan to bring Voyager home sooner, rather than have it spend an additional sixteen years making its journey.",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 25,
  publishedAt: "2001-05-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466954",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/25",
    },
  ],
  title: "Endgame",
  episodeType: "finale",
  stillPath: "/rv2PITgrKTcV4Rf2HXh63oVXKqY.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
