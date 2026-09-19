import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOhSanta = {
  id: "019ea4e7-295f-72eb-85b8-cc48d89983f0",
  type: "page-type/song",
  slug: "ariana-grande-oh-santa",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab956891-dbf7-44e0-8ae9-8e26e696f0b7",
      externalLink: "https://musicbrainz.org/work/ab956891-dbf7-44e0-8ae9-8e26e696f0b7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oh Santa!",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
