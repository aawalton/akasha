import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMidnightRemixesMidnightJonHopkinsRemix = {
  id: "01a0b9ee-f76c-7ff3-89fe-50654505c532",
  type: "page-type/track",
  slug: "coldplay-midnight-remixes-midnight-jon-hopkins-remix",
  ownLength: 10.09565,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-midnight-remixes"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PKa9j9Fqmu2qQZMCQxN0w",
      externalLink: "https://open.spotify.com/track/5PKa9j9Fqmu2qQZMCQxN0w",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight - Jon Hopkins Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "7yxi31szvlbwvKq9dYOmFI", artistName: "Jon Hopkins" },
  ],
  trackKey: "midnightjonhopkinsremix|4gzpq5DPGxSnKTe4SA8HAU,7yxi31szvlbwvKq9dYOmFI|605739",
  song: "song/coldplay-midnight",
} as const satisfies Track
