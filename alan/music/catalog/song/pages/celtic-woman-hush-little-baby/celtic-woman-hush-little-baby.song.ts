import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanHushLittleBaby = {
  id: "01a0b720-114a-7b66-bba9-810fbfc4e92c",
  type: "page-type/song",
  slug: "celtic-woman-hush-little-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "982ae10a-6a5c-3271-a0d1-fcb72fbf7270",
      externalLink: "https://musicbrainz.org/work/982ae10a-6a5c-3271-a0d1-fcb72fbf7270",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hush, Little Baby",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
