import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLetSomebodyGoLetSomebodyGoSingleVersion = {
  id: "01a0b9ee-ed9c-7cd1-a746-8474874fb999",
  type: "page-type/track",
  slug: "coldplay-let-somebody-go-let-somebody-go-single-version",
  ownLength: 3.54915,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-let-somebody-go"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1d8Pn4akKfdadbavUjAGoS",
      externalLink: "https://open.spotify.com/track/1d8Pn4akKfdadbavUjAGoS",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Somebody Go - Single Version",
  trackType: "version",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "0C8ZW7ezQVs4URX5aX7Kqx", artistName: "Selena Gomez" },
  ],
  trackKey: "letsomebodygosingleversion|0C8ZW7ezQVs4URX5aX7Kqx,4gzpq5DPGxSnKTe4SA8HAU|212949",
  song: "song/coldplay-let-somebody-go",
} as const satisfies Track
