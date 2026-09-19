import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayIRanAway = {
  id: "01a0ba5d-456e-71dd-9c10-8174fe6feabe",
  type: "page-type/song",
  slug: "coldplay-i-ran-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b8d4e432-1d79-4727-964f-071d4265b59e",
      externalLink: "https://musicbrainz.org/work/b8d4e432-1d79-4727-964f-071d4265b59e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Ran Away",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
