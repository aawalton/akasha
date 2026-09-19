import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraForgottenLove = {
  id: "019ea4a5-3005-7c74-b529-ec513823552d",
  type: "page-type/song",
  slug: "aurora-forgotten-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "576914a2-4a1e-47b6-b71a-3af47efa50b2",
      externalLink: "https://musicbrainz.org/work/576914a2-4a1e-47b6-b71a-3af47efa50b2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Forgotten Love",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
