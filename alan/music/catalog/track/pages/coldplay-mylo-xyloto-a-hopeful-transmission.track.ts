import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoAHopefulTransmission = {
  id: "01a0b9ee-ddd5-7522-94db-04f89cb75981",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-a-hopeful-transmission",
  ownLength: 0.55,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6n1x3DYFDpRau83XsI32NU",
      externalLink: "https://open.spotify.com/track/6n1x3DYFDpRau83XsI32NU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Hopeful Transmission",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "ahopefultransmission|4gzpq5DPGxSnKTe4SA8HAU|33000",
  song: "song/coldplay-a-hopeful-transmission",
} as const satisfies Track
