import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2HarumScarumOriginalSoundtrack = {
  id: "01a0676a-d71f-7059-bec0-221de228e5a2",
  type: "page-type/release",
  slug: "elvis-presley-2-harum-scarum-original-soundtrack",
  title: "Harum Scarum (Original Soundtrack)",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 24.616717,
  ownProgress: 24.616717,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-01-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3M8hQJhN0yThsGIqKL7rfO",
      externalLink: "https://open.spotify.com/album/3M8hQJhN0yThsGIqKL7rfO",
    },
  ],
} as const satisfies Release
