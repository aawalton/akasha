import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySeeYouSoon = {
  id: "01a0ba5d-528a-7c18-837c-ad92acd066aa",
  type: "page-type/song",
  slug: "coldplay-see-you-soon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5f669501-b15d-4185-812a-4e0a57521c26",
      externalLink: "https://musicbrainz.org/work/5f669501-b15d-4185-812a-4e0a57521c26",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "See You Soon",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
