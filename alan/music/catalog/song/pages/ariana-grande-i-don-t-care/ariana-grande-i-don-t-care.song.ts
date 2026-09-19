import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIDonTCare = {
  id: "019ea4e0-d56c-7782-b3fc-a3d4970e13a0",
  type: "page-type/song",
  slug: "ariana-grande-i-don-t-care",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30ea5e14-5026-413c-8274-a2efbd4ab3f0",
      externalLink: "https://musicbrainz.org/work/30ea5e14-5026-413c-8274-a2efbd4ab3f0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don't Care",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
