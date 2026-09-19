import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonILlBeHomeForChristmas = {
  id: "019ea4ad-1cc7-772b-931c-5ffca5c35710",
  type: "page-type/song",
  slug: "kelly-clarkson-i-ll-be-home-for-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1aa1b720-0c31-4f32-8a63-accc54024713",
      externalLink: "https://musicbrainz.org/work/1aa1b720-0c31-4f32-8a63-accc54024713",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’ll Be Home for Christmas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
