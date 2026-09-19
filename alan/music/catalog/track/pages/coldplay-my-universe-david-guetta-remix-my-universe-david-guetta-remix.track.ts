import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverseDavidGuettaRemixMyUniverseDavidGuettaRemix = {
  id: "01a0b9ee-ee39-7404-885f-aac6c904e0ab",
  type: "page-type/track",
  slug: "coldplay-my-universe-david-guetta-remix-my-universe-david-guetta-remix",
  ownLength: 3.3189166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-my-universe-david-guetta-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5FvxRvrQ8qzKjBJ6ST9aiu",
      externalLink: "https://open.spotify.com/track/5FvxRvrQ8qzKjBJ6ST9aiu",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe - David Guetta Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3Nrfpe0tUJi4K4DXYWgMUX", artistName: "BTS" },
    { externalId: "1Cs0zKBU1kc0i8ypK3B9ai", artistName: "David Guetta" },
  ],
  trackKey:
    "myuniversedavidguettaremix|1Cs0zKBU1kc0i8ypK3B9ai,3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|199135",
  song: "song/coldplay-my-universe",
} as const satisfies Track
