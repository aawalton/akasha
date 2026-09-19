import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSongForYouFarAway = {
  id: "01a0b72f-54ea-755d-ad89-1a9cd26ab6f1",
  type: "page-type/song",
  slug: "james-taylor-song-for-you-far-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c6ce1789-4d78-41bd-914f-d1fe2dc24328",
      externalLink: "https://musicbrainz.org/work/c6ce1789-4d78-41bd-914f-d1fe2dc24328",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Song for You Far Away",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
