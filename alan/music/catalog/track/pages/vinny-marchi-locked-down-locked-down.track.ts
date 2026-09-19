import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLockedDownLockedDown = {
  id: "01a0b112-9aca-7608-8d8c-5369baca10bc",
  type: "page-type/track",
  slug: "vinny-marchi-locked-down-locked-down",
  ownLength: 2.38645,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-locked-down"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Zcfkqfod1trj4MQ8Rvsac",
      externalLink: "https://open.spotify.com/track/6Zcfkqfod1trj4MQ8Rvsac",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "LOCKED DOWN",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "lockeddown|5USAMqcbMAzF3HBmeD5pJF|143187",
  song: "song/vinny-marchi-locked-down",
} as const satisfies Track
