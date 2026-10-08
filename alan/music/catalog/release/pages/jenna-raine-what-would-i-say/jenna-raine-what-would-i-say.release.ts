import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineWhatWouldISay = {
  id: "01a0c621-1857-7769-887a-619f97dc9958",
  type: "page-type/release",
  slug: "jenna-raine-what-would-i-say",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2026-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1uetCWs3QmSxRRE1hwJ6kb",
      externalLink: "https://open.spotify.com/album/1uetCWs3QmSxRRE1hwJ6kb",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "What Would I Say?",
  createdAt: "2026-09-21T22:40:52.823Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
