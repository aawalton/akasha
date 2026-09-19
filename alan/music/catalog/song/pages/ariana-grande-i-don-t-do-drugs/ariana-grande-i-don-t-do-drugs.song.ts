import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIDonTDoDrugs = {
  id: "019ea4e2-acad-723a-9938-d37c53f1aca8",
  type: "page-type/song",
  slug: "ariana-grande-i-don-t-do-drugs",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3978c22-8ffe-4c10-a91d-38feafe90b55",
      externalLink: "https://musicbrainz.org/work/b3978c22-8ffe-4c10-a91d-38feafe90b55",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Do Drugs",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
