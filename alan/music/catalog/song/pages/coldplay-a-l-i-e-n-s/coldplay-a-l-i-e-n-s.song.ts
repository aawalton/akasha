import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayALIENS = {
  id: "01a0ba5d-438c-7095-b924-1b87a353d789",
  type: "page-type/song",
  slug: "coldplay-a-l-i-e-n-s",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a3db58af-fb3c-4a6e-ac21-ba286c985f44",
      externalLink: "https://musicbrainz.org/work/a3db58af-fb3c-4a6e-ac21-ba286c985f44",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A L I E N S",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
