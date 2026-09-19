import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsStrawberrySwing = {
  id: "01a0b9ee-e39b-767c-9cb5-335150ceab26",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-strawberry-swing",
  ownLength: 4.1611,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-or-death-and-all-his-friends"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2dphvmoLEXdk8hOYxmHlI3",
      externalLink: "https://open.spotify.com/track/2dphvmoLEXdk8hOYxmHlI3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Strawberry Swing",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "strawberryswing|4gzpq5DPGxSnKTe4SA8HAU|249666",
  song: "song/coldplay-strawberry-swing",
} as const satisfies Track
