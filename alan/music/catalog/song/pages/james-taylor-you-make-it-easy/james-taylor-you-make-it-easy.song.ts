import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYouMakeItEasy = {
  id: "01a0b72f-4791-7fd3-862a-8004beeecd6d",
  type: "page-type/song",
  slug: "james-taylor-you-make-it-easy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "208d9041-488a-495e-b685-b04565b1b855",
      externalLink: "https://musicbrainz.org/work/208d9041-488a-495e-b685-b04565b1b855",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Make It Easy",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
