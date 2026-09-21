import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartYoullBeInMyHeart = {
  id: "01a0abea-73a2-76c1-8ff5-db2b4326094d",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-youll-be-in-my-heart",
  ownLength: 4.05955,
  ownProgress: 4.05955,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  status: "completed",
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
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "youllbeinmyheart|6NWtt9pNOL2Gx7kBykdE5x|243573",
  song: "song/celtic-woman-youll-be-in-my-heart",
  carriedBy: [
    {
      release: "release/celtic-woman-2-songs-from-the-heart",
      discNumber: 1,
      position: 10,
      externalId: "5jgHQfMXmSu4hx8bXxKW0n",
      externalLink: "https://open.spotify.com/track/5jgHQfMXmSu4hx8bXxKW0n",
    },
  ],
} as const satisfies Track
