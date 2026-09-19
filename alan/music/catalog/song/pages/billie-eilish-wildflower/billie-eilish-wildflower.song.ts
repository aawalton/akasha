import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishWildflower = {
  id: "019ea4aa-03d6-77dc-b5f6-a976c23c4bd5",
  type: "page-type/song",
  slug: "billie-eilish-wildflower",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6ce3e6f5-8a41-4dd3-967a-8be19ff7a25e",
      externalLink: "https://musicbrainz.org/work/6ce3e6f5-8a41-4dd3-967a-8be19ff7a25e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WILDFLOWER",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
