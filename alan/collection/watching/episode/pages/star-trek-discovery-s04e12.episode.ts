import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS04e12 = {
  id: "01a18852-a9f8-7ec7-88ff-33b168700f13",
  type: "page-type/episode",
  slug: "star-trek-discovery-s04e12",
  description:
    "As the DMA approaches Earth and Ni’Var, Captain Burnham and the crew of the U.S.S. Discovery attempt to make First Contact with the powerful species responsible before it’s too late.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-4"],
  position: 12,
  publishedAt: "2022-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3578600",
      externalLink: "https://www.themoviedb.org/tv/67198/season/4/episode/12",
    },
  ],
  title: "Species Ten-C",
  episodeType: "standard",
  stillPath: "/fTaX2TfdeGFe7K7TRJDdtDUZTQR.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
