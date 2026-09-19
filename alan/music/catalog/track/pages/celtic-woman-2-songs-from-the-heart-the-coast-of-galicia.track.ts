import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartTheCoastOfGalicia = {
  id: "01a0abea-7348-7ad1-a53f-99bb35876517",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-the-coast-of-galicia",
  ownLength: 3.6351,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "34weuuOJ49Y1EgSGO5AYBo",
      externalLink: "https://open.spotify.com/track/34weuuOJ49Y1EgSGO5AYBo",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Coast Of Galiçia",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thecoastofgalicia|6NWtt9pNOL2Gx7kBykdE5x|218106",
  song: "song/celtic-woman-the-coast-of-galicia",
} as const satisfies Track
