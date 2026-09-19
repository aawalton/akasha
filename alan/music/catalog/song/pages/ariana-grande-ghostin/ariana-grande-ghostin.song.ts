import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGhostin = {
  id: "019ea4e2-e604-7b0d-9f20-448200112800",
  type: "page-type/song",
  slug: "ariana-grande-ghostin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bba54d4b-35e9-4703-b763-7c15aeeda3bc",
      externalLink: "https://musicbrainz.org/work/bba54d4b-35e9-4703-b763-7c15aeeda3bc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ghostin",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
