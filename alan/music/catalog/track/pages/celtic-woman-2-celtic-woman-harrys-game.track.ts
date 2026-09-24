import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanHarrysGame = {
  id: "01a0abea-79ce-7675-9e9e-c71d4cabcbcb",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-harrys-game",
  ownLength: 2.50555,
  ownProgress: 2.50555,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Harry's Game",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "harrysgame|6NWtt9pNOL2Gx7kBykdE5x|150333",
  song: "song/celtic-woman-harrys-game",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 14,
      externalId: "4TrMDhDetsFAFXZKU004uW",
      externalLink: "https://open.spotify.com/track/4TrMDhDetsFAFXZKU004uW",
    },
  ],
} as const satisfies Track
