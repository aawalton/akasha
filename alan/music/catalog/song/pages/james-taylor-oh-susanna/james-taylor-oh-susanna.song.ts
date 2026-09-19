import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOhSusanna = {
  id: "01a0b72f-3d70-7df2-9759-e85eb7567850",
  type: "page-type/song",
  slug: "james-taylor-oh-susanna",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab4b7950-8fdb-343d-9946-4da5f312af0e",
      externalLink: "https://musicbrainz.org/work/ab4b7950-8fdb-343d-9946-4da5f312af0e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oh! Susanna",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
