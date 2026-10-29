import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e09 = {
  id: "01a18853-ac8a-7ee1-b77d-d8283d8bccce",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e09",
  description:
    "Stardate: Unknown. Upon discovering a cultural symbol drawn in the ground on a planet that was used by his ancestors to 'heal the land', Chakotay tries to contact the beings his tribe called the 'Sky Spirits.'",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 9,
  publishedAt: "1995-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112975",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/9",
    },
  ],
  title: "Tattoo",
  episodeType: "standard",
  stillPath: "/geLWqjnWelCaT9peKqYVD7IObjY.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
