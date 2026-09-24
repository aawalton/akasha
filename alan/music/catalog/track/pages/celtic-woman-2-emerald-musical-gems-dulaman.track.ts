import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2EmeraldMusicalGemsDulaman = {
  id: "01a0abea-6b97-7f7e-a0f0-df1d681534c6",
  type: "page-type/track",
  slug: "celtic-woman-2-emerald-musical-gems-dulaman",
  ownLength: 4.3337666666666665,
  ownProgress: 4.3337666666666665,
  partOfCollections: ["release/celtic-woman-2-emerald-musical-gems"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dúlaman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "dulaman|6NWtt9pNOL2Gx7kBykdE5x|260026",
  song: "song/celtic-woman-dulaman",
  carriedBy: [
    {
      release: "release/celtic-woman-2-emerald-musical-gems",
      discNumber: 1,
      position: 2,
      externalId: "4v2O5KhtNNbNofGg3LXAmr",
      externalLink: "https://open.spotify.com/track/4v2O5KhtNNbNofGg3LXAmr",
    },
  ],
} as const satisfies Track
