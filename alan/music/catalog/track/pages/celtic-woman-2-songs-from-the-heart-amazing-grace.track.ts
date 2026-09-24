import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartAmazingGrace = {
  id: "01a0abea-728b-7f86-bbb4-bc5a23443bf8",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-amazing-grace",
  ownLength: 4.972,
  ownProgress: 4.972,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amazing Grace",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "amazinggrace|6NWtt9pNOL2Gx7kBykdE5x|298320",
  song: "song/celtic-woman-amazing-grace",
  carriedBy: [
    {
      release: "release/celtic-woman-2-songs-from-the-heart",
      discNumber: 1,
      position: 2,
      externalId: "3ktkmx2gmshDYiURNgJbOp",
      externalLink: "https://open.spotify.com/track/3ktkmx2gmshDYiURNgJbOp",
    },
  ],
} as const satisfies Track
