import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesOceans = {
  id: "01a0b9ee-d902-7288-80f7-eabcde465c62",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-oceans",
  ownLength: 5.3613333333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2u4uhtETtcULnkBfFHSnDX",
      externalLink: "https://open.spotify.com/track/2u4uhtETtcULnkBfFHSnDX",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oceans",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "oceans|4gzpq5DPGxSnKTe4SA8HAU|321680",
} as const satisfies Track
