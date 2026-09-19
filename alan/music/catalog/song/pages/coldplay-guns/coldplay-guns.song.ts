import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayGuns = {
  id: "01a0ba5d-49c6-702f-9143-3b1919fb3260",
  type: "page-type/song",
  slug: "coldplay-guns",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f046824c-6879-4215-9bcf-9aa6f053012d",
      externalLink: "https://musicbrainz.org/work/f046824c-6879-4215-9bcf-9aa6f053012d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Guns",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
