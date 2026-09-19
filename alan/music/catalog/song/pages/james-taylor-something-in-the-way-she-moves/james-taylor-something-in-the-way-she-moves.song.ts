import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSomethingInTheWaySheMoves = {
  id: "01a0b72f-53d7-737b-8a49-444be4918f9a",
  type: "page-type/song",
  slug: "james-taylor-something-in-the-way-she-moves",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0e27dcf-3ad0-3580-b0bd-4e36d7d73dc6",
      externalLink: "https://musicbrainz.org/work/c0e27dcf-3ad0-3580-b0bd-4e36d7d73dc6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something in the Way She Moves",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
