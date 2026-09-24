import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyWalkBesideMe = {
  id: "01a0abea-69d9-7dbc-905e-451b06dedc5c",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-walk-beside-me",
  ownLength: 4.252233333333334,
  ownProgress: 4.252233333333334,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "Walk Beside Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "walkbesideme|6NWtt9pNOL2Gx7kBykdE5x|255134",
  song: "song/celtic-woman-walk-beside-me",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 15,
      externalId: "5dXieBLFFUDG5tCTs4eCAb",
      externalLink: "https://open.spotify.com/track/5dXieBLFFUDG5tCTs4eCAb",
    },
  ],
} as const satisfies Track
