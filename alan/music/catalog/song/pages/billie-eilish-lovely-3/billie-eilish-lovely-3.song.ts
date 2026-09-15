import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishLovely3 = {
  id: "019ea4ac-42bc-7a4f-8d08-9e16e9ad495c",
  type: "page-type/song",
  slug: "billie-eilish-lovely-3",
  title: "Lovely",
  artist: "artist/billie-eilish",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fb3c981b-2dc0-4632-b5c5-9f90f0a405bb",
      externalLink: "https://musicbrainz.org/work/fb3c981b-2dc0-4632-b5c5-9f90f0a405bb",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
