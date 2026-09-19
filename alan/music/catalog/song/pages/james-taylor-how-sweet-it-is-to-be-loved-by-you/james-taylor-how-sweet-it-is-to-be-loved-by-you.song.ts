import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHowSweetItIsToBeLovedByYou = {
  id: "01a0b72f-2f86-719b-bcea-f71a03c94eda",
  type: "page-type/song",
  slug: "james-taylor-how-sweet-it-is-to-be-loved-by-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d95ef047-162b-359a-baff-77151014d16d",
      externalLink: "https://musicbrainz.org/work/d95ef047-162b-359a-baff-77151014d16d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How Sweet It Is (to Be Loved by You)",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
