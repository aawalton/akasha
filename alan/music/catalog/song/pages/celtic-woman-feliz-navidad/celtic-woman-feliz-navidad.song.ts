import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanFelizNavidad = {
  id: "01a0b720-1111-7c12-b9a8-67531e8f8504",
  type: "page-type/song",
  slug: "celtic-woman-feliz-navidad",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "969a1e76-3743-3314-a9dd-6a2f6d4985c2",
      externalLink: "https://musicbrainz.org/work/969a1e76-3743-3314-a9dd-6a2f6d4985c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Feliz Navidad",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
