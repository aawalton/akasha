import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMyLove = {
  id: "019ea4c6-aa0c-7279-a352-bf266a50d886",
  type: "page-type/song",
  slug: "sia-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "05a9e944-767c-49d7-859c-59f561511ee6",
      externalLink: "https://musicbrainz.org/work/05a9e944-767c-49d7-859c-59f561511ee6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Love",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
