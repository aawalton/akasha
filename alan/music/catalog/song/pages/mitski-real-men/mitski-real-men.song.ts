import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiRealMen = {
  id: "019f0ea6-7b4b-79aa-a425-433edaf9912e",
  type: "page-type/song",
  slug: "mitski-real-men",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cb97ea92-9e06-45dd-90c2-47979a0fa049",
      externalLink: "https://musicbrainz.org/work/cb97ea92-9e06-45dd-90c2-47979a0fa049",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Real Men",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
