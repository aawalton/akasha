import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriendsVivaLaVida = {
  id: "01a0b9ee-e351-75eb-aa12-3cefdc1f5969",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-viva-la-vida",
  ownLength: 4.03955,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-or-death-and-all-his-friends"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1mea3bSkSGXuIRvnydlB5b",
      externalLink: "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Viva La Vida",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "vivalavida|4gzpq5DPGxSnKTe4SA8HAU|242373",
  song: "song/coldplay-viva-la-vida",
} as const satisfies Track
