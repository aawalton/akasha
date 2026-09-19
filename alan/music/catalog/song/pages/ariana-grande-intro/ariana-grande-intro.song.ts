import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIntro = {
  id: "019ea4e1-fbe5-7651-92e0-cf0fc5ae9851",
  type: "page-type/song",
  slug: "ariana-grande-intro",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7703d087-51e0-4071-8402-1870b7d86ec8",
      externalLink: "https://musicbrainz.org/work/7703d087-51e0-4071-8402-1870b7d86ec8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Intro",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
