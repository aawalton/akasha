import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2EmeraldMusicalGemsDulaman = {
  id: "01a0abea-6b97-7f7e-a0f0-df1d681534c6",
  type: "page-type/track",
  slug: "celtic-woman-2-emerald-musical-gems-dulaman",
  ownLength: 4.3337666666666665,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-emerald-musical-gems"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4v2O5KhtNNbNofGg3LXAmr",
      externalLink: "https://open.spotify.com/track/4v2O5KhtNNbNofGg3LXAmr",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Dúlaman",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "dulaman|6NWtt9pNOL2Gx7kBykdE5x|260026",
  song: "song/celtic-woman-dulaman",
} as const satisfies Track
