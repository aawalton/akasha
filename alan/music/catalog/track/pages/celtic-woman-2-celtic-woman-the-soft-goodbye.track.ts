import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanTheSoftGoodbye = {
  id: "01a0abea-79f1-7117-8f6d-96a6fb1cff5d",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-the-soft-goodbye",
  ownLength: 3.985333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30TNRTx436onqMfH6YHiG3",
      externalLink: "https://open.spotify.com/track/30TNRTx436onqMfH6YHiG3",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Soft Goodbye",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thesoftgoodbye|6NWtt9pNOL2Gx7kBykdE5x|239120",
  song: "song/celtic-woman-the-soft-goodbye",
} as const satisfies Track
