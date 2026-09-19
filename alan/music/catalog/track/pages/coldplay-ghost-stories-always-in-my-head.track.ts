import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesAlwaysInMyHead = {
  id: "01a0b9ee-d80d-7cfa-bfd5-75af3e3ed762",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-always-in-my-head",
  ownLength: 3.6104333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-ghost-stories"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FMjqbY3aWo1QDbo3GwXib",
      externalLink: "https://open.spotify.com/track/0FMjqbY3aWo1QDbo3GwXib",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Always in My Head",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "alwaysinmyhead|4gzpq5DPGxSnKTe4SA8HAU|216626",
  song: "song/coldplay-always-in-my-head",
} as const satisfies Track
