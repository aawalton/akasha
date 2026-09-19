import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDeckTheHalls = {
  id: "01a0b72f-2106-702d-bc67-7507114c047d",
  type: "page-type/song",
  slug: "james-taylor-deck-the-halls",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1ce352f8-147f-304b-8735-24bf7401cb14",
      externalLink: "https://musicbrainz.org/work/1ce352f8-147f-304b-8735-24bf7401cb14",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Deck the Halls",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
