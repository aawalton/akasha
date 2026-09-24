import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanTheButterfly = {
  id: "01a0abea-79ab-7ddc-8f8d-8e143f1813cf",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-the-butterfly",
  ownLength: 3.0037666666666665,
  ownProgress: 3.0037666666666665,
  partOfCollections: [
    "release/celtic-woman-2-celtic-woman",
    "release/celtic-woman-2-decade-the-songs-the-show-the-traditions-the-classics",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Butterfly",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thebutterfly|6NWtt9pNOL2Gx7kBykdE5x|180226",
  song: "song/celtic-woman-the-butterfly",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 13,
      externalId: "1Doqw5c9ilLdxIVbGIPW9k",
      externalLink: "https://open.spotify.com/track/1Doqw5c9ilLdxIVbGIPW9k",
    },
    {
      release: "release/celtic-woman-2-decade-the-songs-the-show-the-traditions-the-classics",
      discNumber: 3,
      position: 4,
      externalId: "51KJG8koxoIVNcuQeYINQp",
      externalLink: "https://open.spotify.com/track/51KJG8koxoIVNcuQeYINQp",
    },
  ],
} as const satisfies Track
