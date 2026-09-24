import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeGoingHome = {
  id: "01a0abea-5a38-76d0-a2f0-a1e1ab8539e6",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-going-home",
  ownLength: 4.0331,
  ownProgress: 4.0331,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land-deluxe",
    "release/celtic-woman-2-ancient-land",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Going Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "goinghome|6NWtt9pNOL2Gx7kBykdE5x|241986",
  song: "song/celtic-woman-going-home",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 16,
      externalId: "40Ip7UhsWGMjjoXGzJw2rY",
      externalLink: "https://open.spotify.com/track/40Ip7UhsWGMjjoXGzJw2rY",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 16,
      externalId: "0wg0Ly8aadaS8FonmAu27A",
      externalLink: "https://open.spotify.com/track/0wg0Ly8aadaS8FonmAu27A",
    },
  ],
} as const satisfies Track
