import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverseGalantisRemixMyUniverseGalantisRemix = {
  id: "01a0b9ee-ee61-7d49-bb01-33cdae25ec3d",
  type: "page-type/track",
  slug: "coldplay-my-universe-galantis-remix-my-universe-galantis-remix",
  ownLength: 3.748466666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-my-universe-galantis-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DlczmjByrS4qxRVfGjpqN",
      externalLink: "https://open.spotify.com/track/1DlczmjByrS4qxRVfGjpqN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe - Galantis Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3Nrfpe0tUJi4K4DXYWgMUX", artistName: "BTS" },
    { externalId: "4sTQVOfp9vEMCemLw50sbu", artistName: "Galantis" },
  ],
  trackKey:
    "myuniversegalantisremix|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU,4sTQVOfp9vEMCemLw50sbu|224908",
  song: "song/coldplay-my-universe",
} as const satisfies Track
