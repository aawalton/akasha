import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2ElvisOnTour = {
  id: "01a0676a-d71d-7002-a277-183642e6566c",
  type: "page-type/release",
  slug: "elvis-presley-2-elvis-on-tour",
  title: "Elvis On Tour",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 391.817817,
  ownProgress: 391.817817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-12-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7GsLjMQBwLaKbXHTV9s11S",
      externalLink: "https://open.spotify.com/album/7GsLjMQBwLaKbXHTV9s11S",
    },
  ],
} as const satisfies Release
