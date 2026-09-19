import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTalk2Talk = {
  id: "01a0b9ee-fe3d-7bb4-8b6b-bf154cf26a1b",
  type: "page-type/track",
  slug: "coldplay-talk-2-talk",
  ownLength: 4.426433333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-talk-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07TzXoUAtflCfeipNNXFtk",
      externalLink: "https://open.spotify.com/track/07TzXoUAtflCfeipNNXFtk",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "talk|4gzpq5DPGxSnKTe4SA8HAU|265586",
  song: "song/coldplay-talk",
} as const satisfies Track
