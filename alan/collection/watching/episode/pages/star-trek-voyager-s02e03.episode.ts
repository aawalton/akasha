import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e03 = {
  id: "01a18853-ac8a-7e92-aede-37f1717d8204",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e03",
  description:
    "Stardate: 48892.1. The Emergency Medical Hologram is activated during a red alert and finds the ship has been abandoned after an unknown emergency. As he explores, evidence mounts that the Doctor may in fact be the only real human in a holo-program called Voyager.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 3,
  publishedAt: "1995-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112969",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/3",
    },
  ],
  title: "Projections",
  episodeType: "standard",
  stillPath: "/kPdw1N83DPceSYtoOwU6bcpu06h.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
