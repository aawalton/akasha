import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLetSomebodyGoOfenbachRemixLetSomebodyGoOfenbachRemix = {
  id: "01a0b9ee-ec64-7c10-9f25-468cd8997e36",
  type: "page-type/track",
  slug: "coldplay-let-somebody-go-ofenbach-remix-let-somebody-go-ofenbach-remix",
  ownLength: 3.24145,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-let-somebody-go-ofenbach-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pDrM3rKlxA9fx3mShxzqx",
      externalLink: "https://open.spotify.com/track/1pDrM3rKlxA9fx3mShxzqx",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Somebody Go - Ofenbach Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "0C8ZW7ezQVs4URX5aX7Kqx", artistName: "Selena Gomez" },
    { externalId: "4AKwRarlmsUlLjIwt38NLw", artistName: "Ofenbach" },
  ],
  trackKey:
    "letsomebodygoofenbachremix|0C8ZW7ezQVs4URX5aX7Kqx,4AKwRarlmsUlLjIwt38NLw,4gzpq5DPGxSnKTe4SA8HAU|194487",
  song: "song/coldplay-let-somebody-go",
} as const satisfies Track
