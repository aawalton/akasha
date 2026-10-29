import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e05 = {
  id: "01a18853-ac89-794d-8ad2-d8e4c5d152c1",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e05",
  description:
    "Stardate: 48546.2. Janeway tries to figure out what her dynamic with the crew should be while all stuck in the Delta Quadrant together. Voyager tries to harvest omicron particles to refuel the ship, but inadvertently injures a spacefaring organism.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 5,
  publishedAt: "1995-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112910",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/5",
    },
  ],
  title: "The Cloud",
  episodeType: "standard",
  stillPath: "/tLDHB2bqCVME1Ii4Qvz54TStNoj.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
