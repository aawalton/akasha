import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYWhatIf = {
  id: "01a0b9ee-e409-7ba6-8311-2e5b9cd08625",
  type: "page-type/track",
  slug: "coldplay-x-y-what-if",
  ownLength: 4.975316666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-x-y"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39qRdHcl2tizWbzlM9kUlN",
      externalLink: "https://open.spotify.com/track/39qRdHcl2tizWbzlM9kUlN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What If",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "whatif|4gzpq5DPGxSnKTe4SA8HAU|298519",
} as const satisfies Track
