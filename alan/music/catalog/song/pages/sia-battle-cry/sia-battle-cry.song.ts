import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBattleCry = {
  id: "019ea4c5-ccbb-7d88-88c9-f23e0176a840",
  type: "page-type/song",
  slug: "sia-battle-cry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ca4887b0-37b3-4092-908f-39f42fc6feb8",
      externalLink: "https://musicbrainz.org/work/ca4887b0-37b3-4092-908f-39f42fc6feb8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Battle Cry",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
