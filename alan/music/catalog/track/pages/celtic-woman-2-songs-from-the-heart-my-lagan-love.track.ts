import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartMyLaganLove = {
  id: "01a0abea-72d9-7113-a374-c0c538b7db03",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-my-lagan-love",
  ownLength: 2.882,
  ownProgress: 2.882,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Lagan Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "mylaganlove|6NWtt9pNOL2Gx7kBykdE5x|172920",
  song: "song/celtic-woman-my-lagan-love",
  carriedBy: [
    {
      release: "release/celtic-woman-2-songs-from-the-heart",
      discNumber: 1,
      position: 4,
      externalId: "2jUzgcSBRIWdUxlomlgfWi",
      externalLink: "https://open.spotify.com/track/2jUzgcSBRIWdUxlomlgfWi",
    },
  ],
} as const satisfies Track
