import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBlueBayou = {
  id: "019ea4ae-ce21-7fff-a71f-8018455d1495",
  type: "page-type/song",
  slug: "kelly-clarkson-blue-bayou",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "653769c3-7a78-3b1b-9bcc-be7a6c335a1b",
      externalLink: "https://musicbrainz.org/work/653769c3-7a78-3b1b-9bcc-be7a6c335a1b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blue Bayou",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
