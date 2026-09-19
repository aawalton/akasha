import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAntiHero = {
  id: "019ea416-1124-7288-b7b9-f3c095e333b7",
  type: "page-type/song",
  slug: "taylor-swift-anti-hero",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aae062a3-a98c-48e0-ab5f-d52a7953c414",
      externalLink: "https://musicbrainz.org/work/aae062a3-a98c-48e0-ab5f-d52a7953c414",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Anti‐Hero",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
