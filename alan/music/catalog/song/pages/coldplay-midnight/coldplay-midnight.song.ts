import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMidnight = {
  id: "01a0ba5d-531a-70a5-8b0d-23384e907d59",
  type: "page-type/song",
  slug: "coldplay-midnight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "75b7431e-bcca-4660-bc4b-164fe423a336",
      externalLink: "https://musicbrainz.org/work/75b7431e-bcca-4660-bc4b-164fe423a336",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Midnight",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
