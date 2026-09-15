import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaUnstoppable = {
  id: "019ea4ce-149c-7d87-a906-833b39f9a729",
  type: "page-type/song",
  slug: "sia-unstoppable",
  title: "Unstoppable",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c663fee4-5807-4887-af18-9678aa14348c",
      externalLink: "https://musicbrainz.org/work/c663fee4-5807-4887-af18-9678aa14348c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "S",
  singability: "S",
  tags: ["masking"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
