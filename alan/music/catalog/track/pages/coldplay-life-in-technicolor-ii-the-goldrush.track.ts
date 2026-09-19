import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLifeInTechnicolorIiTheGoldrush = {
  id: "01a0b9ee-fb07-7ff1-a9e8-27b2ca2b0f92",
  type: "page-type/track",
  slug: "coldplay-life-in-technicolor-ii-the-goldrush",
  ownLength: 2.48755,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-life-in-technicolor-ii"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7jWasg4ilKcOwcrGPI0CT1",
      externalLink: "https://open.spotify.com/track/7jWasg4ilKcOwcrGPI0CT1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Goldrush",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thegoldrush|4gzpq5DPGxSnKTe4SA8HAU|149253",
  song: "song/coldplay-the-goldrush",
} as const satisfies Track
