import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e01 = {
  id: "01a18853-ac91-7db3-96b7-bd6c69b7ce7a",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e01",
  description:
    "Stardate: 54014.4 - Partially transformed into Borg drones, Janeway, Tuvok, and Torres run a covert operation on board a Borg ship to infect the collective with a virus that will free subdued individuals from the hive's control.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 1,
  publishedAt: "2000-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466818",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/1",
    },
  ],
  title: "Unimatrix Zero (2)",
  episodeType: "standard",
  stillPath: "/tX9Xrxro2z372v8xV121VuA3DkY.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
