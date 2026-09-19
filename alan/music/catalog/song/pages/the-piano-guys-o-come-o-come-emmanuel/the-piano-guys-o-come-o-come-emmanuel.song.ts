import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysOComeOComeEmmanuel = {
  id: "01a0b71e-9817-7f99-91ac-fb1639d67497",
  type: "page-type/song",
  slug: "the-piano-guys-o-come-o-come-emmanuel",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "09d0b344-1396-4985-a3aa-d4b4db7e2b33",
      externalLink: "https://musicbrainz.org/work/09d0b344-1396-4985-a3aa-d4b4db7e2b33",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Come, O Come, Emmanuel",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
