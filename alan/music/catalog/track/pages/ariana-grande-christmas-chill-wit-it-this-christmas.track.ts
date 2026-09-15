import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillWitItThisChristmas = {
  id: "01a0a6c5-3a06-7ca6-9345-4d6befe43135",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-wit-it-this-christmas",
  ownLength: 2.6878166666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5E1VtxCfgrXsbbp9g6sFq5",
      externalLink: "https://open.spotify.com/track/5E1VtxCfgrXsbbp9g6sFq5",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Wit It This Christmas",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "wititthischristmas|66CXWjxzNUsdJxJ2JdwvnR|161269",
} as const satisfies Track
