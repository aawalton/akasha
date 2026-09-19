import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanCaledonia = {
  id: "01a0b720-07e0-7640-a6f6-bf601d0c548c",
  type: "page-type/song",
  slug: "celtic-woman-caledonia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17c7a0bd-5250-3e5e-8c38-487006ce0a47",
      externalLink: "https://musicbrainz.org/work/17c7a0bd-5250-3e5e-8c38-487006ce0a47",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Caledonia",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
