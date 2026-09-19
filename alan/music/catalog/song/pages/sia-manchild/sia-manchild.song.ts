import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaManchild = {
  id: "019ea4c9-e092-75d8-8ddd-a4d4f271f644",
  type: "page-type/song",
  slug: "sia-manchild",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c4855d7e-0cb3-335b-b483-37422989d585",
      externalLink: "https://musicbrainz.org/work/c4855d7e-0cb3-335b-b483-37422989d585",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Manchild",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
