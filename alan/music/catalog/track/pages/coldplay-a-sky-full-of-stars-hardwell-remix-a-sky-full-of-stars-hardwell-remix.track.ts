import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStarsHardwellRemixASkyFullOfStarsHardwellRemix = {
  id: "01a0b9ee-f573-7d3d-94ff-916e4e5bf44b",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-hardwell-remix-a-sky-full-of-stars-hardwell-remix",
  ownLength: 5.218733333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-hardwell-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0WZVGXO8FYpK8v1IDxlOyE",
      externalLink: "https://open.spotify.com/track/0WZVGXO8FYpK8v1IDxlOyE",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Sky Full of Stars - Hardwell Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "6BrvowZBreEkXzJQMpL174", artistName: "Hardwell" },
  ],
  trackKey: "askyfullofstarshardwellremix|4gzpq5DPGxSnKTe4SA8HAU,6BrvowZBreEkXzJQMpL174|313124",
  song: "song/coldplay-a-sky-full-of-stars",
} as const satisfies Track
