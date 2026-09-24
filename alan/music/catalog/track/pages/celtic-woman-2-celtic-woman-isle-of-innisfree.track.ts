import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanIsleOfInnisfree = {
  id: "01a0abea-786b-7222-a5cc-1d2d1568e2f0",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-isle-of-innisfree",
  ownLength: 3.4411,
  ownProgress: 3.4411,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Isle Of Innisfree",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "isleofinnisfree|6NWtt9pNOL2Gx7kBykdE5x|206466",
  song: "song/celtic-woman-isle-of-innisfree",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 3,
      externalId: "1HKHNnDfN0jGMMl27Tmu9N",
      externalLink: "https://open.spotify.com/track/1HKHNnDfN0jGMMl27Tmu9N",
    },
  ],
} as const satisfies Track
