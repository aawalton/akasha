import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2VoicesOfAngelsAcrossTheWorld = {
  id: "01a0abea-60f8-7920-bb73-8f0458863836",
  type: "page-type/track",
  slug: "celtic-woman-2-voices-of-angels-across-the-world",
  ownLength: 3.58955,
  ownProgress: 3.58955,
  partOfCollections: ["release/celtic-woman-2-voices-of-angels"],
  status: "completed",
  unit: "unit/minutes",
  title: "Across The World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "acrosstheworld|6NWtt9pNOL2Gx7kBykdE5x|215373",
  song: "song/celtic-woman-across-the-world",
  carriedBy: [
    {
      release: "release/celtic-woman-2-voices-of-angels",
      discNumber: 1,
      position: 12,
      externalId: "3MB57zlaE9q7rUvyew2Dcc",
      externalLink: "https://open.spotify.com/track/3MB57zlaE9q7rUvyew2Dcc",
    },
  ],
} as const satisfies Track
