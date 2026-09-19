import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTellMeWhy = {
  id: "019ea416-3018-782b-b3cb-20573907c3d4",
  type: "page-type/song",
  slug: "taylor-swift-tell-me-why",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2dae6981-ef7b-348a-97f1-35428f51aa72",
      externalLink: "https://musicbrainz.org/work/2dae6981-ef7b-348a-97f1-35428f51aa72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tell Me Why",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
