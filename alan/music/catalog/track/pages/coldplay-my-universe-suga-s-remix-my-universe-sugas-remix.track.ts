import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverseSugaSRemixMyUniverseSugasRemix = {
  id: "01a0b9ee-eef9-753b-8860-ed983a26d39f",
  type: "page-type/track",
  slug: "coldplay-my-universe-suga-s-remix-my-universe-sugas-remix",
  ownLength: 3.1372333333333335,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-my-universe-suga-s-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BeOJPXMstvXolxKbL09kR",
      externalLink: "https://open.spotify.com/track/6BeOJPXMstvXolxKbL09kR",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe - SUGA's Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3Nrfpe0tUJi4K4DXYWgMUX", artistName: "BTS" },
    { externalId: "0ebNdVaOfp6N0oZ1guIxM8", artistName: "SUGA" },
  ],
  trackKey:
    "myuniversesugasremix|0ebNdVaOfp6N0oZ1guIxM8,3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|188234",
  song: "song/coldplay-my-universe",
} as const satisfies Track
