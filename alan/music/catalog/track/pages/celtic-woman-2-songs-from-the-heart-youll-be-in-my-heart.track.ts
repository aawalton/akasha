import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartYoullBeInMyHeart = {
  id: "01a0abea-73a2-76c1-8ff5-db2b4326094d",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-youll-be-in-my-heart",
  ownLength: 4.05955,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5jgHQfMXmSu4hx8bXxKW0n",
      externalLink: "https://open.spotify.com/track/5jgHQfMXmSu4hx8bXxKW0n",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You'll Be In My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "youllbeinmyheart|6NWtt9pNOL2Gx7kBykdE5x|243573",
  song: "song/celtic-woman-youll-be-in-my-heart",
} as const satisfies Track
