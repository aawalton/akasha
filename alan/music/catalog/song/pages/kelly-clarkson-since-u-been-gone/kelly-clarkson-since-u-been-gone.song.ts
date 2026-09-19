import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSinceUBeenGone = {
  id: "019ea4b2-e045-71a8-adc2-a2a2d0d20b07",
  type: "page-type/song",
  slug: "kelly-clarkson-since-u-been-gone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8cec7817-e78f-39f4-b58e-3cc9bf830423",
      externalLink: "https://musicbrainz.org/work/8cec7817-e78f-39f4-b58e-3cc9bf830423",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Since U Been Gone",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
