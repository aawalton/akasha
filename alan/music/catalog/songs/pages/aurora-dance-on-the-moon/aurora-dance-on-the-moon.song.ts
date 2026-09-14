import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const auroraDanceOnTheMoon = {
  id: "019ea4a3-b364-77c4-aa9c-120204ae0138",
  type: "song",
  slug: "aurora-dance-on-the-moon",
  title: "Dance on the Moon",
  artist: "artist/aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "219fbf1e-5f0a-4ab3-851c-518987baf969",
      externalLink: "https://musicbrainz.org/work/219fbf1e-5f0a-4ab3-851c-518987baf969",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
