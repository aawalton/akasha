import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAppleTree = {
  id: "019ea4a4-2ed1-77de-852d-f624f9366449",
  type: "page-type/song",
  slug: "aurora-apple-tree",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3658ba97-b1c5-4f5e-87e5-85ce17e62d5f",
      externalLink: "https://musicbrainz.org/work/3658ba97-b1c5-4f5e-87e5-85ce17e62d5f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Apple Tree",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
