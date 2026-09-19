import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOnlySuperstition = {
  id: "01a0ba60-fa32-77cb-89f2-a7d6568e6a7c",
  type: "page-type/song",
  slug: "coldplay-only-superstition",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c1e1762e-0e95-3c49-8ed5-3090706a3198",
      externalLink: "https://musicbrainz.org/work/c1e1762e-0e95-3c49-8ed5-3090706a3198",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only Superstition",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
