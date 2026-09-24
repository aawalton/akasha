import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2HomeForChristmasAdesteFideles = {
  id: "01a0abea-6dec-75af-ae47-e06302953f22",
  type: "page-type/track",
  slug: "celtic-woman-2-home-for-christmas-adeste-fideles",
  ownLength: 4.335333333333334,
  ownProgress: 4.335333333333334,
  partOfCollections: ["release/celtic-woman-2-home-for-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "Adeste Fideles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "adestefideles|6NWtt9pNOL2Gx7kBykdE5x|260120",
  song: "song/celtic-woman-adeste-fideles",
  carriedBy: [
    {
      release: "release/celtic-woman-2-home-for-christmas",
      discNumber: 1,
      position: 8,
      externalId: "2Uy1mimDi2YYZMNyENsh02",
      externalLink: "https://open.spotify.com/track/2Uy1mimDi2YYZMNyENsh02",
    },
  ],
} as const satisfies Track
