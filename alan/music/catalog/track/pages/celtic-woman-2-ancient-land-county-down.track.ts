import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandCountyDown = {
  id: "01a0abea-5c44-7260-8a17-7c08ebf622f1",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-county-down",
  ownLength: 3.7268833333333333,
  ownProgress: 3.7268833333333333,
  partOfCollections: [
    "release/celtic-woman-2-ancient-land",
    "release/celtic-woman-2-ancient-land-deluxe",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "County Down",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "countydown|6NWtt9pNOL2Gx7kBykdE5x|223613",
  song: "song/celtic-woman-county-down",
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 5,
      externalId: "0t0jSK7QTP5VMpXOhvMAas",
      externalLink: "https://open.spotify.com/track/0t0jSK7QTP5VMpXOhvMAas",
    },
    {
      release: "release/celtic-woman-2-ancient-land-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "1aAJD7jF3l0F7ATDbYq3rt",
      externalLink: "https://open.spotify.com/track/1aAJD7jF3l0F7ATDbYq3rt",
    },
  ],
} as const satisfies Track
