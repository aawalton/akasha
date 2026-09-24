import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayUpUpFreedoRemixUpUpFreedoRemix = {
  id: "01a0b9ee-f4a5-712f-991e-3eaf7f430d4c",
  type: "page-type/track",
  slug: "coldplay-up-up-freedo-remix-up-up-freedo-remix",
  ownLength: 3.5049,
  ownProgress: 3.5049,
  partOfCollections: ["release/coldplay-up-up-freedo-remix"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up&Up - Freedo Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Freedo" }],
  trackKey: "upupfreedoremix|2b6Cbp1cgD0hwisrGbKsZJ,4gzpq5DPGxSnKTe4SA8HAU|210294",
  song: "song/coldplay-up-up",
  carriedBy: [
    {
      release: "release/coldplay-up-up-freedo-remix",
      discNumber: 1,
      position: 1,
      externalId: "2KIgC0WnwwcDPgv8ClxXfi",
      externalLink: "https://open.spotify.com/track/2KIgC0WnwwcDPgv8ClxXfi",
    },
  ],
} as const satisfies Track
