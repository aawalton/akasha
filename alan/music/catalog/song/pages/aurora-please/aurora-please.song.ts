import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraPlease = {
  id: "019ea4a6-b4e0-7b06-ba65-11dd62985b77",
  type: "page-type/song",
  slug: "aurora-please",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "afe9b68f-8c1c-4e31-bea7-9c691734b9a6",
      externalLink: "https://musicbrainz.org/work/afe9b68f-8c1c-4e31-bea7-9c691734b9a6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "PLEASE",
  artist: "artist/aurora",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
