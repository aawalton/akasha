import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySparks = {
  id: "01a0ba60-fe14-7b5b-b3d8-c9138d81c251",
  type: "page-type/song",
  slug: "coldplay-sparks",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f7f52a5d-8ceb-3ca7-836c-0ddb42c53d20",
      externalLink: "https://musicbrainz.org/work/f7f52a5d-8ceb-3ca7-836c-0ddb42c53d20",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sparks",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
