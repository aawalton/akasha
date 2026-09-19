import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeImagine = {
  id: "019ea4e0-e083-7841-aa6f-df100410ddc4",
  type: "page-type/song",
  slug: "ariana-grande-imagine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "332378d2-b629-4ec1-b4ae-a0c4c937b159",
      externalLink: "https://musicbrainz.org/work/332378d2-b629-4ec1-b4ae-a0c4c937b159",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "imagine",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
