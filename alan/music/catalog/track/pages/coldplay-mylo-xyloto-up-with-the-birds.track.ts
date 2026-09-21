import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoUpWithTheBirds = {
  id: "01a0b9ee-de38-70c8-bb5f-56ee8a862c9d",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-up-with-the-birds",
  ownLength: 3.760883333333333,
  ownProgress: 3.760883333333333,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 14,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lIFsEWj9IjNEALbHnPosE",
      externalLink: "https://open.spotify.com/track/5lIFsEWj9IjNEALbHnPosE",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up with the Birds",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "upwiththebirds|4gzpq5DPGxSnKTe4SA8HAU|225653",
  song: "song/coldplay-up-with-the-birds",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 14,
      externalId: "5lIFsEWj9IjNEALbHnPosE",
      externalLink: "https://open.spotify.com/track/5lIFsEWj9IjNEALbHnPosE",
    },
  ],
} as const satisfies Track
