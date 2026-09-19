import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMurderMurder = {
  id: "01a0b9ef-0168-7ca9-a96b-b66c61082768",
  type: "page-type/track",
  slug: "coldplay-murder-murder",
  ownLength: 5.581316666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-murder"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "41qujRJ7RG759UklwNHStb",
      externalLink: "https://open.spotify.com/track/41qujRJ7RG759UklwNHStb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Murder",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "murder|4gzpq5DPGxSnKTe4SA8HAU|334879",
} as const satisfies Track
