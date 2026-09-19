import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadAmsterdam = {
  id: "01a0b9ee-e8fa-72cf-9f29-74cbee62111c",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-amsterdam",
  ownLength: 5.322666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2uQ4px5SPONsgcUpulywIQ",
      externalLink: "https://open.spotify.com/track/2uQ4px5SPONsgcUpulywIQ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Amsterdam",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "amsterdam|4gzpq5DPGxSnKTe4SA8HAU|319360",
  song: "song/coldplay-amsterdam",
} as const satisfies Track
