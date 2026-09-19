import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartWhenYouBelieve = {
  id: "01a0abea-72ff-75be-8f53-cc65b8ac3587",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-when-you-believe",
  ownLength: 4.515766666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mb1xCQfrrJVuUoQnLmqit",
      externalLink: "https://open.spotify.com/track/7mb1xCQfrrJVuUoQnLmqit",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "When You Believe",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "whenyoubelieve|6NWtt9pNOL2Gx7kBykdE5x|270946",
  song: "song/celtic-woman-when-you-believe",
} as const satisfies Track
