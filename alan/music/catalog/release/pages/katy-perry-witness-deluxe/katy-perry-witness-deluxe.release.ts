import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryWitnessDeluxe = {
  id: "01a0676a-d731-7030-aab7-f97122d8cf28",
  type: "page-type/release",
  slug: "katy-perry-witness-deluxe",
  title: "Witness (Deluxe)",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 65.117717,
  ownProgress: 65.117717,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-06-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0UlbGi4oAth8s6rwaGSU8Z",
      externalLink: "https://open.spotify.com/album/0UlbGi4oAth8s6rwaGSU8Z",
    },
  ],
  createdAt: "2026-09-03T13:17:30.289Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
