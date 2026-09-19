import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartNonCePiu = {
  id: "01a0abea-7366-75e5-bb42-a4f7a5db3411",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-non-ce-piu",
  ownLength: 4.8331,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2hSIWpbqiac0MGrYHycKJM",
      externalLink: "https://open.spotify.com/track/2hSIWpbqiac0MGrYHycKJM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Non C'è Più",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "noncepiu|6NWtt9pNOL2Gx7kBykdE5x|289986",
  song: "song/celtic-woman-non-ce-piu",
} as const satisfies Track
