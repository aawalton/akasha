import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesShiver = {
  id: "01a0b9ee-e94c-7ffd-ab5e-dd4cd21c383a",
  type: "page-type/track",
  slug: "coldplay-parachutes-shiver",
  ownLength: 5.07,
  ownProgress: 5.07,
  partOfCollections: ["release/coldplay-parachutes", "release/coldplay-shiver"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shiver",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "shiver|4gzpq5DPGxSnKTe4SA8HAU|304200",
  song: "song/coldplay-shiver",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 2,
      externalId: "0qksx8mV28lztYIZ1om8ml",
      externalLink: "https://open.spotify.com/track/0qksx8mV28lztYIZ1om8ml",
    },
    {
      release: "release/coldplay-shiver",
      discNumber: 1,
      position: 1,
      externalId: "6LFG5WLD8KWSb308OU35q9",
      externalLink: "https://open.spotify.com/track/6LFG5WLD8KWSb308OU35q9",
    },
  ],
} as const satisfies Track
