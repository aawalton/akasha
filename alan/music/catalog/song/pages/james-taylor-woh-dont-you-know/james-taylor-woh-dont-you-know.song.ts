import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWohDontYouKnow = {
  id: "01a0b72f-59a6-7b43-93aa-c890e42b73ca",
  type: "page-type/song",
  slug: "james-taylor-woh-dont-you-know",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f8d7143a-cecb-4592-9d21-27fe51a3221b",
      externalLink: "https://musicbrainz.org/work/f8d7143a-cecb-4592-9d21-27fe51a3221b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Woh, Don't You Know",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
