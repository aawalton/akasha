import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyHushLittleBaby = {
  id: "01a0abea-723c-7a8a-84fd-402ccde97c2c",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-hush-little-baby",
  ownLength: 0.8362166666666667,
  ownProgress: 0.8362166666666667,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hush Little Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }, { artistName: "Lisa Kelly" }],
  trackKey: "hushlittlebaby|4VdV1ro3dBSsu1cRGwbFD3,6NWtt9pNOL2Gx7kBykdE5x|50173",
  song: "song/celtic-woman-hush-little-baby",
  carriedBy: [
    {
      release: "release/celtic-woman-2-lullaby",
      discNumber: 1,
      position: 10,
      externalId: "25AkNO6z4a2pQ3Uy4rKvA7",
      externalLink: "https://open.spotify.com/track/25AkNO6z4a2pQ3Uy4rKvA7",
    },
  ],
} as const satisfies Track
