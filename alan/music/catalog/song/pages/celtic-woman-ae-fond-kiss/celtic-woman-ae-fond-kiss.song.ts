import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAeFondKiss = {
  id: "01a0b720-0da5-78e3-a959-e4a09599af61",
  type: "page-type/song",
  slug: "celtic-woman-ae-fond-kiss",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "68463a7c-0ebf-357b-b406-1fbf07f48155",
      externalLink: "https://musicbrainz.org/work/68463a7c-0ebf-357b-b406-1fbf07f48155",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ae Fond Kiss",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
