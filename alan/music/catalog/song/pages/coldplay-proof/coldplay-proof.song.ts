import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayProof = {
  id: "01a0ba5d-5087-71c4-8ec0-dadd641c2827",
  type: "page-type/song",
  slug: "coldplay-proof",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "54e2389b-0635-47d5-8b3e-e0c39ad8c20a",
      externalLink: "https://musicbrainz.org/work/54e2389b-0635-47d5-8b3e-e0c39ad8c20a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Proof",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
