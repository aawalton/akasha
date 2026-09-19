import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishGuitarSongsTv = {
  id: "01a0b638-e8d6-71ff-a192-b9579af30556",
  type: "page-type/track",
  slug: "billie-eilish-guitar-songs-tv",
  ownLength: 4.689666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-guitar-songs"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3GYlZ7tbxLOxe6ewMNVTkw",
      externalLink: "https://open.spotify.com/track/3GYlZ7tbxLOxe6ewMNVTkw",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "TV",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "tv|6qqNVTkY8uBg9cP3Jd7DAH|281380",
  song: "song/billie-eilish-tv",
} as const satisfies Track
