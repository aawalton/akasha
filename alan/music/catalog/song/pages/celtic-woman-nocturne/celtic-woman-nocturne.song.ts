import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanNocturne = {
  id: "01a0b720-0f1b-72d3-bf33-18bf0db0627c",
  type: "page-type/song",
  slug: "celtic-woman-nocturne",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7ce49ae8-3a70-3090-9a8a-06120bce2dcb",
      externalLink: "https://musicbrainz.org/work/7ce49ae8-3a70-3090-9a8a-06120bce2dcb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nocturne",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
