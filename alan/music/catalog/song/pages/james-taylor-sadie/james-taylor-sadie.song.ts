import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSadie = {
  id: "01a0b72f-5468-7a06-8cd7-3f370b341c67",
  type: "page-type/song",
  slug: "james-taylor-sadie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c50ddce0-eacb-35f2-9398-accc671de0ec",
      externalLink: "https://musicbrainz.org/work/c50ddce0-eacb-35f2-9398-accc671de0ec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sadie",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
