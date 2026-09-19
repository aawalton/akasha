import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIvy = {
  id: "019ea416-2659-7377-9a70-553ed4d0c65e",
  type: "page-type/song",
  slug: "taylor-swift-ivy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a1a7af66-f7a8-48ad-b593-33c09903fba2",
      externalLink: "https://musicbrainz.org/work/a1a7af66-f7a8-48ad-b593-33c09903fba2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ivy",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
