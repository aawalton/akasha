import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanDannyBoy = {
  id: "01a0abea-7889-7ba6-b059-e2a165a8b26b",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-danny-boy",
  ownLength: 3.407766666666667,
  ownProgress: 3.407766666666667,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Danny Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "dannyboy|6NWtt9pNOL2Gx7kBykdE5x|204466",
  song: "song/celtic-woman-danny-boy",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 4,
      externalId: "75sSAymXP6tGOeRvImwzOf",
      externalLink: "https://open.spotify.com/track/75sSAymXP6tGOeRvImwzOf",
    },
  ],
} as const satisfies Track
