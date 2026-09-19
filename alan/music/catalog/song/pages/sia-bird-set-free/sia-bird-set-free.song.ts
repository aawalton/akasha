import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBirdSetFree = {
  id: "019ea4c3-812f-7eec-a581-bb0594330a90",
  type: "page-type/song",
  slug: "sia-bird-set-free",
  rank: "S",
  tags: ["masking"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "481211aa-62a4-47c9-bb50-aaf0f607c8d0",
      externalLink: "https://musicbrainz.org/work/481211aa-62a4-47c9-bb50-aaf0f607c8d0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bird Set Free",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "S-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
