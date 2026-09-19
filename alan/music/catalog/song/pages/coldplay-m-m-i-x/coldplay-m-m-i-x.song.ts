import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMMIX = {
  id: "01a0ba5d-4b02-7fc9-b0b9-a87ceba16194",
  type: "page-type/song",
  slug: "coldplay-m-m-i-x",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "071783f8-2e19-4688-a0ab-c7dbaa4485f1",
      externalLink: "https://musicbrainz.org/work/071783f8-2e19-4688-a0ab-c7dbaa4485f1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "M.M.I.X.",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
