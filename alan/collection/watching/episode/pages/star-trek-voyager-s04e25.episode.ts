import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e25 = {
  id: "01a18853-ac8e-748a-9b56-c482f4a92524",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e25",
  description:
    "Stardate: 51929.3. The crew goes into stasis during a month-long journey through a nebula, leaving Seven and the Doctor in sole charge of running the ship.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 25,
  publishedAt: "1998-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113189",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/25",
    },
  ],
  title: "One",
  episodeType: "standard",
  stillPath: "/vo9atN9Di4M2D6AP2OI290z4ckM.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
